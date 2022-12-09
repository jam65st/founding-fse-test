/**
 * # SubSetGenerator (arrow function)
 * This method gets all subsets of a set of integers with an approach of **Bit Masking**
 * (for a selective data extraction from other dataset.
 *
 * ## The Problem
 * The goal is represent all numbers from 1 to 2^(N-1) where N is the size of the subset
 * in a binary format.
 *
 *
 * @param sourceSet [number]: source set of integers
 * @author: Jaime Alexander Mendez M. <jam65st@gmail.com>
 * @date: 2022-12-09
 * @return {*[]}: subset
 * @constructor
 */
const SubSetGenerator = sourceSet =>
{
	// Initialize containers to preserve the resulting subsets
	let [ testingSet, sourceLength ] = [ new Set(), sourceSet.length ],
	    [ result, hashMap ]          = [ [], {} ],
	    temporaryResult; // outputs
	
	// Obtaining 2^N
	const N = 1 << sourceLength; // N (enumerate)
	
	// Adding subsets to the testing set
	for ( let i = 0; i < N; i++ ){
		// Reset at each iteration
		let [ bit, position, subSet ] = [ i, 0, [] ];
		
		while ( bit ){
			// Each bit seated must be inserted in the subset
			if ( bit & 1 ) subSet.push( sourceSet[ position ] );
			position++;
			bit >>= 1;
		}
		
		// Add NON empty subsets to the testingSet ONLY
		if ( subSet.length > 0 ) testingSet.add( subSet );
	}
	
	// Remove Duplicates
	// 1. pass the testing set ([]) to a hashMap ({})
	testingSet.forEach( array => { hashMap[ array.join( '|' ) ] = array } );
	// 2. pass back to an Array
	temporaryResult = Object.keys( hashMap ).map( k => hashMap[ k ] );
	// 3. review contents
	for ( let i = 0; i < temporaryResult.length; i++ ) result.push( temporaryResult[ i ] );
	
	// return results
	return result;
}

// HELPERS | BATTERY TEST
/**
 * # randomNumber
 * Generates a random number between a limited range (min to max)
 *
 * @param min
 * @param max
 * @return {number}
 */
const randomNumber = ( min = 5, max = 20 ) => Math.floor( Math.random() * ( max - min + 1 ) + min )

/**
 * # randomArray
 * Creates a new array to fill with integers
 *
 * @param items number: quantity of items to node creation
 * @param sorted boolean: allows to return a random array with or without sort their contents
 * @return {*[]}
 */
const randomArray = ( items = randomNumber(), sorted = true ) =>
{
	let result = [], index = 0, rn;
	
	while ( index < items ){
		rn = randomNumber();
		if ( result.includes( rn ) ) continue;
		result.push( rn );
		index++;
	}
	return sorted ? result.sort( ( a, b ) => b - a ) : result;
}

let primarySet   = [ 1, 2, 2 ],
    secondarySet = [ 1, 5, 6 ],
    practiceSet

let test = randomArray();
console.log( test )
console.log( 'T', SubSetGenerator( primarySet ) )
console.log( 'T', SubSetGenerator( secondarySet ) )
console.log( 'T', SubSetGenerator( practiceSet ) )
console.log( 'T', SubSetGenerator( randomArray() ) )

