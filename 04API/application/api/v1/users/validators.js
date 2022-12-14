/**
 * # validators
 *
 * Provides a toolset to test each feature before to interact with DB
 */

/**
 * ## testToken
 * verify if the submitted token is valid, and returns
 * the token grants or false
 *
 * @param r request
 * @param DB DataBase
 * @return {boolean|token} false or token grants
 */
const TokenValidator = ( r, DB ) =>
{
	// Obtains information about the token in the request
	let info = r.body.token ||
			    r.query.token ||
			    r.headers[ "x-access-token" ] ||
			    r.headers.authorization ||
			    false,
	    type,
	    value;
	
	// Case NOT information in request
	if ( !info ) return false;
	
	// Split the got information
	[ type, value ] = info.split( ' ' );
	
	// CASE type is NOT Bearer
	if ( type !== 'Bearer' ) return false;
	
	// Verify token grants in DB
	return DB.verifyToken( value );
}

/**
 * ## SchemaValidator
 * Adds Non Defined Elements to the data
 * Compares data properties with the defined into the schema
 * and returns
 *
 * @param data
 * @param schema
 * @param add
 * @return {[boolean|{},*[]|string]}
 * @constructor
 */
const SchemaValidator = ( data, schema, add = {} ) =>
{
	// add any extra data to the result
	const [ result, unique ] = [ add, [] ];
	let item;
	
	// passing data elements to result
	for ( item in data ) result[ item ] = data[ item ];
	
	// validate
	for ( item in schema ){
		// required first
		if ( schema[ item ].required && result[ item ] === undefined ) return [ false, `Requires ${ item }` ]
		
		// if exist
		if ( result[ item ] ){
			// Checking data type
			if ( typeof result[ item ] !== schema[ item ].type &&
					schema[ item ].type === 'array' && !Array.isArray( result[ item ] )
			) return [ false, `${ item } Type inconsistent expected: ${ schema[ item ].type } but received: ${ result[ item ] }` ];
			
			// Passing to lower or upper case according to the schema
			if ( schema[ item ].lowercase ) result[ item ] = result[ item ].toLowerCase();
			if ( schema[ item ].uppercase ) result[ item ] = result[ item ].toUpperCase();
			
			// If schema provides validation rules {type|value}
			if ( schema[ item ].validate ){
				if ( schema[ item ].validate.type === 'regex' ){
					if ( !result[ item ].match( schema[ item ].validate.value ) )
						return [ false, `${ item }: ${ result[ item ] } Isn't consistent` ];
				} // TODO: Future validations of Schema
			}
			
			// Checking If it is a non-repeatable element or index
			if ( schema[ item ].index.unique ) unique.push( item );
		}
	}
	return [ result, unique ];
}

/**
 * ## RequestValidator
 * Verify if conditions are fitted to allow a response
 *
 * @param query {object} such as got from request query
 * @param conditions type of information to obtain
 * @return {boolean|*[]}
 * @constructor
 */
const RequestValidator = ( query, conditions ) =>
{
	let KEY = [];
	
	const methods = {
		length: ( obj, min, max = null ) =>
		{
			max       = max === null || isNaN( max ) || max < min ? min : max;
			let index = 0;
			for ( let data in obj ){
				KEY.push( data );
				index++;
			}
			return [ index >= min && index <= max, index ];
		},
		indexOf: ( _r, arr, str ) => [ arr.indexOf( str ) > -1, arr.indexOf( str ), str ]
		// If requires another kind of validations add here
		//
	}
	
	let result = true, it;
	
	for ( let kind in conditions ){
		it = methods[ kind ]( query, conditions[ kind ], KEY.toString() );
		if ( !it[ 0 ] ) return [ ...it, kind ]
	}
	
	return result;
}

// NOTIFICATION MESSAGES
const AddUserNotices     = {
	AddUser100: 'Please verify your email at:',
	AddUser102: 'Invalid Bearer Token [value|scope] ',
	AddUser103: 'Invalid User, email was registered yet',
	AddUser104: 'Invalid User, Do not complains DataSchema',
	AddUser130: 'Invalid UserID is registered yet, contact your administrator',
	AddUser200: 'Unknown ERROR, contact your administrator.'
}
const VerifyEmailNotices = {
	Email100: 'Email has been Validated',
	Email101: 'Email was be verified yet',
	Email103: 'Email Inconsistent',
	Email102: 'User Inconsistent',
	Email105: 'Data provided is Invalid'
}
const RemoveUserNotices  = {
	RMUser100: 'User has been removed',
	RMUser102: 'Invalid Bearer Token [value|scope]',
	RMUser103: 'Do not exist user with the provided ID',
	RMUser200: 'Unknown ERROR, contact your administrator.'
}
const GetUserNotices     = {
	GetUser100: 'User has been recovered',
	GetUser102: 'Invalid Bearer Token [value|scope] ',
	GetUser103: 'Invalid Arguments, expected 1 and got:',
	GetUser104: 'Invalid Key, got:',
	GetUser110: 'No one has registered wit the provided data'
}

module.exports.TokenValidator      = TokenValidator;
module.exports.RequestValidator    = RequestValidator;
module.exports.SchemaValidator     = SchemaValidator;
module.exports.ADD_USER_NOTICES    = AddUserNotices;
module.exports.GET_USER_NOTICES    = GetUserNotices;
module.exports.REMOVE_USER_NOTICES = RemoveUserNotices;
module.exports.EMAIL_VERIFICATION  = VerifyEmailNotices;