/**
 * # to_decimal
 * Given the base (eg: 2) and the base_number (eg: [1, 0, 1, 1]),
 * return the decimal representation (in this case, answer should be 11).
 *
 * @param base {number}
 * @param base_number {[number|string,*]}
 * @return {number}
 */
const to_decimal = ( base, base_number ) => parseInt( base_number.join( '' ), base );

/**
 * # from_decimal
 * Given the base (eg: 2) and the decimal_number (eg: 11),
 * return the base representation (in this case, answer should be [1, 0, 1, 1])
 *
 * @param base {number}
 * @param decimal_number {number}
 * @return  {[number|string,*]}
 */
const from_decimal = ( base, decimal_number ) =>
{
	let result = decimal_number.toString( base ).split( '' );
	if ( base <= 10 ) result.map( Number );
	return result;
}

// TESTING
const test      = []
const givenTest = [
	{
		base: 2,
		base_number: [ 1, 0, 1, 1 ]
	}, {
		base: 7,
		base_number: [ 5, 1, 6, 0, 3, 6, 2 ]
	}, {
		base: 16,
		base_number: 'ffcc00'.split( '' )
	}
]

for ( let i = 0; i < givenTest.length; i++ ){
	test[ i ] = {}
	console.log( `---\nGiven number in base ${ givenTest[ i ].base } is: ${ givenTest[ i ].base_number }` );
	test[ i ].decimal = to_decimal( givenTest[ i ].base, givenTest[ i ].base_number );
	console.log( `Converted decimal number is ${ test[ i ].decimal }` )
	test[ i ].recover = from_decimal( givenTest[ i ].base, test[ i ].decimal )
	console.log( `Recovered number in base  ${ givenTest[ i ].base } is: ${ test[ i ].recover }` )
	console.log( `Preview: ${ givenTest[ i ].base_number } | ${ test[ i ].recover }` )
	console.log( `Is the code working correctly? ${ JSON.stringify( givenTest[ i ].base_number ) === JSON.stringify( test[ i ].recover ) }\n---` )
}