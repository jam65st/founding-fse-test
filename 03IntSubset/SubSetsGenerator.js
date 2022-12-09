/**
 * # SubSetGenerator (arrow function)
 * This method gets a subset of a set of integers with an approach of **Bit Masking**.
 *
 * ## The Problem
 * The goal is represent all numbers from 1 to 2^(N-1) where N is the size of the subset
 * in a binary format.
 *
 *
 * @param parentSet
 * @constructor
 */
const SubSetGenerator = parentSet =>
{

}

let primarySet = [ 1, 2, 2 ],
    subSet     = SubSetGenerator( primarySet ),
    mostSet    = [ 1, 5, 6 ];

console.log( subSet )
console.log( mostSet )