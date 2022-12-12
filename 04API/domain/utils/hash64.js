/**
 * Hash64 is an easy hashing solution to encode int Numbers and decode Strings
 * This is a non standard crypto solution
 * @base https://stackoverflow.com/questions/6213227/fastest-way-to-convert-a-number-to-radix-64-in-javascript/21000132#21000132
 */

/**
 * STR64 ia an Array with characters and positions to seek,
 * sort and rebuild the methods of this module
 *
 * @type Array
 */
const STR64 = ( 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+|' ).split( '' );

// METHODS
/**
 * encode64: Method to transform a radix 10 number to radix 64 number (as string)
 *
 * @param inputNumber input   {Number} for transform to radix 64 (as String)
 * @param current current {String} data (don't needed in request)
 * @return String {Number} in radix 64 as String;
 *
 * @based http://stackoverflow.com/users/383780/monocle
 * @based base64( Method for number to string - NOT string part )
 */
const encoder = ( inputNumber, current = '' ) =>
{
	inputNumber = ( inputNumber < 0 && current.length === 0 )
	              ? inputNumber * -1
	              : inputNumber;
	
	let main    = inputNumber % 64,
	    residue = Math.floor( inputNumber / 64 ),
	    writing = STR64[ main ] + current;
	return ( residue <= 0 ) ? writing : encoder( residue, writing );
}

/**
 * decode64: Method for transform a number in radix 64 (as string) in radix 10 number
 *
 * @param inputString input   Number in radix 64 (as String) to transform in radix 10
 * @return Number in radix 10
 *
 * @based http://stackoverflow.com/users/520997/reb-cabin
 * @based Base64.toNumber( Method for string to number )
 */
const decoder = inputString =>
{
	let result = 0,
	    input  = inputString.split( '' ),
	    character;
	
	for ( character in input ) result = ( result * 64 ) + STR64.indexOf( input[ character ] );
	
	return result;
}


module.exports.encode64       = encoder;
module.exports.decode64       = decoder;
module.exports.defaultEncoded = function ()
{
	return encoder( Number( new Date() ) );
}

/**
 * @example
 * let i=0, min=0, max=1000000000000, num,str,rec;
 *
 * for ( i == 0; i < 20; i++ ){
 *   num = ( Math.ceil( Math.random() * ( max - min + 1) ) + min );
 *   str = encode64( n )
 *   rec = decode64( s )
 *   console.log( i + "\t" + num + "\t" + str + "\t" + rec + "\t" + ( rec === num ) )
 * }
 */
