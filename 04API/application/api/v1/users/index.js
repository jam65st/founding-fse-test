const InMemoryDB     = require( "../../../../infrastructure/db/InMemoryDB" ),
      DataBase       = new InMemoryDB( true ),
      { userSchema } = require( '../../../../domain/models/users' ),
      APIUtils       = require( "./validators" );

const Grants        = {
	createNewUser: [ 'all', 'write' ],
	removeUser: [ 'all', 'write', 'delete' ]
}
const TestingFields = {}

/**
 * ## [ addUserToDB ]: CreateNewUser
 *
 * @param request {...}
 * @param response: Response<ResBody,Locals>
 * @param next: NextFunction
 * @constructor
 */
const CreateNewUser = ( request, response, next ) =>
{
	// Set a feasible unique UserID and
	// Validate Bearer Token Authorization
	const currentID   = DataBase.newUserID;
	let validToken    = APIUtils.TokenValidator( request, DataBase ),
	    [ Id, Email ] = [ false, false ],
	    tokenError    = 'token',
	    result, userToAdd;
	
	// Test Token grants
	if ( validToken &&
			Grants.createNewUser
			      .indexOf( validToken.scope ) === -1
	) [ validToken, tokenError ] = [ false, tokenError + ' & grants' ];
	
	// Reject token
	if ( !validToken ) response.status( 403 ) // 102 Invalid Token
	                           .json( makeResponses( 'addUser', 102, `${ APIUtils.ADD_USER_NOTICES.AddUser102 }: ${ tokenError }` ) );//
	
	// Continue
	if ( validToken ){
		// Update user and validate DataModel with Schema (such as MongoDB)
		userToAdd = APIUtils.SchemaValidator(
				request.body,
				userSchema,
				{ Id: currentID, ValidEmail: false }
		);
		
		// Validate Unique Fields
		if ( userToAdd[ 0 ] ){
			Id    = DataBase.isUniqueUserID( userToAdd[ 0 ].Id )
			Email = DataBase.isUniqueUserEmail( userToAdd[ 0 ].Email );
			
			// TODO: Evaluate if retry CreateNewUser
			// Notice AddUser130 Duplicated ID (IMPORTANT)
			if ( !Id ) response.status( 403 )
			                   .json( makeResponses( 'addUser', 130, APIUtils.ADD_USER_NOTICES.AddUser130, userToAdd[ 0 ].id ) );
			
			// Notice AddUser103 Email was registered yet
			if ( !Email ) response.status( 403 )// 103 Email
			                      .json( makeResponses( 'addUser', 103, APIUtils.ADD_USER_NOTICES.AddUser103, userToAdd[ 0 ].Email ) );
		} else {
			// Notice AddUser104 Do not complains DataSchema
			response.status( 403 )// 104
			        .json( makeResponses( 'addUser', 104, APIUtils.ADD_USER_NOTICES.AddUser104, request.body ) );
		}
		
		// Add User to DataBase
		if ( validToken && userToAdd[ 0 ] && Id && Email )
			result = DataBase.addUser( userToAdd[ 0 ] );
		
		// Make a Response
		
		// Notice AddUser200 ERROR | DataBase do not respond
		if ( userToAdd[ 0 ] && !result )
			response.status( 403 )
			        .json(
					        makeResponses(
							        'addUser',
							        200,
							        APIUtils.ADD_USER_NOTICES.AddUser200
					        )
			        );
		
		// Notice AddUser 100 SUCCESS!!!
		if ( userToAdd[ 0 ] && result )
			response.json(
					makeResponses(
							'addUser',
							100,
							`${ APIUtils.ADD_USER_NOTICES.AddUser100 } http://${ request.headers.host }/api/v1/users/verify/${ currentID }?Email=${ userToAdd[ 0 ].Email }`
					)
			);
	}
	
	if ( validToken && userToAdd[ 0 ] && Id && Email && next ) next();
}

const RemoveUser = ( request, response, next ) =>
{
	// Validate Bearer Token Authorization
	const validToken = testToken( request ),
	      tokenError = 'token';
	
	// Test Token grants
	if ( validToken &&
			Grants.createNewUser
			      .indexOf( validToken.scope ) === -1
	) [ validToken, tokenError ] = [ false, tokenError + ' & grants' ];
	
	// Reject token
	if ( !validToken ) response.status( 403 ).send( `Invalid Bearer Token [value|scope] ${ tokenError }` );
}

const GetUserByID = ( request, response, next ) =>
{
	// Validate Bearer Token Authorization
	const validToken = testToken( request ),
	      tokenError = 'token';
	
	// Test Token grants
	if ( validToken &&
			Grants.createNewUser
			      .indexOf( validToken.scope ) === -1
	) [ validToken, tokenError ] = [ false, tokenError + ' & grants' ];
	
	// Reject token
	if ( !validToken ) response.status( 403 ).send( `Invalid Bearer Token [value|scope] ${ tokenError }` );
}

const GetUserByName = ( request, response, next ) =>
{
	// Validate Bearer Token Authorization
	const validToken = testToken( request ),
	      tokenError = 'token';
	
	// Test Token grants
	if ( validToken &&
			Grants.createNewUser
			      .indexOf( validToken.scope ) === -1
	) [ validToken, tokenError ] = [ false, tokenError + ' & grants' ];
	
	// Reject token
	if ( !validToken ) response.status( 403 ).send( `Invalid Bearer Token [value|scope] ${ tokenError }` );
}

const GetUserByEmail = ( request, response, next ) =>
{
	// Validate Bearer Token Authorization
	const validToken = testToken( request ),
	      tokenError = 'token';
	
	// Test Token grants
	if ( validToken &&
			Grants.createNewUser
			      .indexOf( validToken.scope ) === -1
	) [ validToken, tokenError ] = [ false, tokenError + ' & grants' ];
	
	// Reject token
	if ( !validToken ) response.status( 403 ).send( `Invalid Bearer Token [value|scope] ${ tokenError }` );
}

const ConfirmUserEmail = ( request, response, next ) =>
{
	console.log( 'params', request.params )
	console.log( 'body', request.body )
	console.log( 'query', request.query )
	console.log( 'host', request.headers.host )
	console.log( 'base', request.baseUrl )
	console.log( '-url', request.url )
	console.log( '-org', request.originalUrl )
	// DO NOT REQUIRES TOKEN
	// DO NOT ALLOWS NextFunction
	const verify = DataBase.verifyUserEmailData( {
		                                             Id: request.params.Id,
		                                             Email: request.query.Email
	                                             } );
	response.json( makeResponses( 'ConfirmUserEmail', verify, `${ APIUtils.EMAIL_VERIFICATION[ 'Email' + verify ] }` ) );
}

/**
 * 	console.log( 'params', request.params )
 * 	console.log( 'body', request.body )
 * 	console.log( 'query', request.query )
 * 	console.log( 'host', request.header)
 */


/**
 * ## MakeResponses
 * Generate responses to any request
 *
 * @param action {string}: involved procedural
 * @param value {number}: response value
 * @param message {string}: information about response
 * @param extra {any}: any additional detail
 * @return {{success: boolean, action: string, message: string, value: number, extra}}
 */
const makeResponses = ( action, value, message, extra = null ) =>
{
	let result = {
		action: action,
		success: value === 100,
		value: value,
		message: message
	}
	if ( extra ) result.extra = extra;
	return result;
}

module.exports.database             = DataBase;
module.exports.addUserToDB          = CreateNewUser;
module.exports.removeUserFromDB     = RemoveUser;
module.exports.getUserByIDFromDB    = GetUserByID;
module.exports.getUserByNameFromDB  = GetUserByName;
module.exports.getUserByEmailFromDB = GetUserByEmail;
module.exports.confirmUserEmailToDB = ConfirmUserEmail;