const InMemoryDB     = require( "../../../../infrastructure/db/InMemoryDB" ),
      DataBase       = new InMemoryDB( true ),
      { userSchema } = require( '../../../../domain/models/users' ),
      APIUtils       = require( "./validators" );

/**
 * ## Grants
 * Allowed permission to access data in the API, according with the registered in the API Bearer Tokens on BD.
 *
 * @type {{removeUser: string[], getUser: string[], createNewUser: string[]}}
 */
const Grants = {
	createNewUser: [ 'all', 'write' ],
	removeUser: [ 'all', 'write', 'delete' ],
	getUser: [ 'all', 'write', 'delete', 'update', 'read' ]
}

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
	// Notice AddUser102 Invalid Token
	if ( !validToken ) response.status( 403 ) // 102 Invalid Token
	                           .json( makeResponses( 'addUser', 102, `${ APIUtils.ADD_USER_NOTICES.AddUser102 }: ${ tokenError }` ) );
	
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
	
	// NextFunction implementation
	if ( validToken && userToAdd[ 0 ] && Id && Email && next ) next();
}

/**
 * ## [removeUserFromDB]: RemoveUser
 *
 * @param request {...}
 * @param response: Response<ResBody,Locals>
 * @param next: NextFunction
 * @constructor
 */
const RemoveUser = ( request, response, next ) =>
{
	// Validate Bearer Token Authorization
	const validToken      = APIUtils.TokenValidator( request, DataBase ),
	      tokenError      = 'token',
	      userId          = request.query.Id || request.params.Id;
	let [ result, exist ] = [ false, false ];
	
	// Test Token grants
	if ( validToken &&
			Grants.removeUser
			      .indexOf( validToken.scope ) === -1
	) [ validToken, tokenError ] = [ false, tokenError + ' & grants' ];
	
	// Reject token
	// Notice RMUser102 Invalid Token
	if ( !validToken ) response.status( 403 ) // 102 Invalid Token
	                           .json(
			                           makeResponses(
					                           'removeUser',
					                           102,
					                           `${ APIUtils.REMOVE_USER_NOTICES.RMUser102 }: ${ tokenError }`
			                           )
	                           );
	
	// Verify if user to remove is in DataBase
	if ( validToken ) exist = !DataBase.isUniqueUserID( userId );
	
	// Notice RMUser103 NotUser
	if ( validToken && !exist ) response.status( 403 )
	                                    .json(
			                                    makeResponses(
					                                    'removeUser',
					                                    103,
					                                    APIUtils.REMOVE_USER_NOTICES.RMUser103
			                                    )
	                                    );
	
	// Remove User from DataBase
	if ( validToken && exist ) result = DataBase.removeUser( userId )
	
	// Notice RMUser200 ERROR | DataBase do not respond
	if ( validToken && exist && !result )
		response.status( 403 )
		        .json(
				        makeResponses(
						        'removeUser',
						        200,
						        APIUtils.REMOVE_USER_NOTICES.RMUser200
				        )
		        );
	
	// Notice RMUser100 Success!!!
	if ( validToken && exist && result )
		response.json(
				makeResponses(
						'removeUser',
						100,
						APIUtils.REMOVE_USER_NOTICES.RMUser100 )
		);
	
	// NextFunction implementation
	if ( validToken && exist && result && next ) next();
}

/**
 * ## [getUserFromDB] GetUserByCriteria
 * Verify the request and try to obtain data from DB
 *
 * @param request {...}
 * @param response: Response<ResBody,Locals>
 * @param next: NextFunction
 * @constructor
 */
const GetUserByCriteria = ( request, response, next ) =>
{
	// Validate Bearer Token Authorization
	const validToken = APIUtils.TokenValidator( request, DataBase ),
	      tokenError = 'token';
	let query, validRequest, result, info;
	
	// Test Token grants
	if ( validToken &&
			Grants.getUser
			      .indexOf( validToken.scope ) === -1
	) [ validToken, tokenError ] = [ false, tokenError + ' & grants' ];
	
	// Reject token
	// Notice GetUser102 Invalid Token
	if ( !validToken )
		response.status( 403 ) // 102 Invalid Token
		        .json(
				        makeResponses(
						        'addUser',
						        102,
						        `${ APIUtils.ADD_USER_NOTICES.AddUser102 } : ${ tokenError }`
				        )
		        );
	
	// Review query before validate
	// Primary
	query = JSON.stringify( request.query );
	// prepare to fix bad-formed query (only one param without kind )
	query = query.split( ':' ).length === 2
	        && query.split( ':' )[ 1 ] === '""}'
	        ? query.split( '"' )[ 1 ]
	        : query;
	// rebuild queries in many levels of conformation
	query = query === JSON.stringify( request.query )
	        ? request.query
	        : query.indexOf( '@' ) !== -1
	          ? { Email: query }
	          : query.length > 6 && query.length < 9 && query.indexOf( ' ' ) === -1 && DataBase.canBeUserID( query )
	            ? { Id: query }
	            : query.indexOf( ' ' ) > -1
	              ? { Name: query }
	              : { any: query }
	
	// Test if the query is valid or has issues to reject
	validRequest = APIUtils.RequestValidator(
			query,
			{
				length: 1,
				indexOf: [ 'Id', 'Email', 'Name', 'any' ]
			}
	)
	
	// Rejected issues with gotten arguments
	if ( Array.isArray( validRequest ) ){ // 103, 104
		info = validRequest.pop() === 'length' ? 103 : 104;
		// Notice GetUser103: Invalid Arguments, expected 1 and got: X
		// Notice GetUser104: Invalid Key, got: X
		response.status( 403 ) // Some errors
		        .json(
				        makeResponses(
						        'getUser',
						        info,
						        `${ APIUtils.GET_USER_NOTICES[ 'GetUser' + info ] } ${ validRequest.pop() }`
				        )
		        );
	}
	
	// Processing valid requests
	if ( validRequest === true ){
		// Notice GetUser100: User has been recovered
		// Notice GetUser110: No one has registered wit the provided data
		for ( let data in query )
			result = DataBase.getUser( data, query[ data ] );
		
		info = result.length === 0 ? 110 : 100
		
		response.json(
				makeResponses(
						'getUser',
						info,
						`${ APIUtils.GET_USER_NOTICES[ 'GetUser' + info ] }`,
						null,
						info === 110 ? null : result
				)
		);
	}
	
	// NextFunction implementation
	if ( validToken && validRequest === true && result && next ) next();
}

/**
 * ##[ConfirmUserEmailToDB] ConfirmUserEmail
 *
 * @param request {...}
 * @param response: Response<ResBody,Locals>
 * @param next: NextFunction
 * @constructor
 */
const ConfirmUserEmail = ( request, response, next ) =>
{
	// DO NOT REQUIRES TOKEN
	// DO NOT ALLOWS NextFunction
	const verify = DataBase.verifyUserEmailData( {
		                                             Id: request.params.Id,
		                                             Email: request.query.Email
	                                             } );
	response.json(
			makeResponses(
					'confirmUserEmail',
					verify,
					`${ APIUtils.EMAIL_VERIFICATION[ 'Email' + verify ] }`
			)
	);
	
	if ( next )
		console.error( `DO NOT ALLOWED NextFunction at:, ${ new Date() }` )
}


/**
 * ## MakeResponses
 * Generate responses to any request
 *
 * @param action {string}: involved procedural
 * @param value {number}: response value
 * @param message {string}: information about response
 * @param extra {any}: any additional detail
 * @param data [{any}]: get responses
 * @return {{success: boolean, info: {action: string, message: string, value: number, extra}, data: [] }}
 */
const makeResponses = ( action, value, message, extra = null, data = null ) =>
{
	let result = {
		success: value === 100,
		info: {
			status: value,
			action: action,
			message: message
		}
	}
	
	if ( extra ) result.info.extra = extra;
	if ( data ) result.data = data;
	
	return result;
}

module.exports.database             = DataBase;
module.exports.addUserToDB          = CreateNewUser;
module.exports.removeUserFromDB     = RemoveUser;
module.exports.getUserFromDB        = GetUserByCriteria;
module.exports.confirmUserEmailToDB = ConfirmUserEmail;