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
		// console.log( valid, item, result[ item ], typeof result[ item ] );
		
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

// NOTIFY MESSAGES
const AddUserNotices     = {
	'AddUser100': 'Please verify your email at:',
	'AddUser102': 'Invalid Bearer Token [value|scope] ',
	'AddUser103': 'Invalid User, email was registered yet',
	'AddUser104': 'Invalid User, Do not complains DataSchema',
	'AddUser130': 'Invalid UserID is registered yet, contact your administrator',
	'AddUser200': 'Unknown ERROR, contact your administrator.'
}
const VerifyEmailNotices = {
	'Email100': 'Email has been Validated',
	'Email101': 'Email was be verified yet',
	'Email102': 'Email Inconsistent',
	'Email103': 'User Inconsistent',
	'Email104': 'Data provided is Invalid'
}

module.exports.TokenValidator     = TokenValidator;
module.exports.SchemaValidator    = SchemaValidator;
module.exports.ADD_USER_NOTICES   = AddUserNotices;
module.exports.EMAIL_VERIFICATION = VerifyEmailNotices;