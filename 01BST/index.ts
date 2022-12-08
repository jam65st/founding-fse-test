import BSTNode from "./BST/BSTNode";
import BST from "./BST/BST";

const initial_node = new BSTNode( 93, 'hello' );
initial_node.print();

let tree_0 = new BST(),
    tree_1 = new BST();

const expected = ( value: number, exp: any, bst:BST ): any | null =>
{
	let result = bst.search( value );
	console.log( `testing: ${ value } | get: ${ result } | exp: ${ exp } | result: ${ result === exp }` );
	return result;
};

const random = ( min:number, max:number ):number => Math.floor(Math.random() * (max - min + 1) + min);



//TEST 1 ( tree_0 )
console.log( '\n\n------------------- TEST 1' )

let list: Array<{ key: number, value: any }> = [
	{ key: 94, value: 'hello' },
	{ key: 33, value: 'world' },
	{ key: 125, value: 'where' },
	{ key: 68, value: 'is' },
	{ key: 44, value: 'my' },
	{ key: 32, value: 'smile' }
];
console.log( 'inserting items to BST' )
for ( let i = 0; i < list.length; i++ ) tree_0.insert( list[ i ] )

console.log( 'reviewing expected' )
for ( let i = 0; i < list.length; i++ ) expected( list[ i ].key, list[ i ].value, tree_0 )

console.log( 'reviewing expected 2' )
for ( let i = 0; i < list.length; i++ ) expected( list[ i ].key, list[ i < list.length - 1 ? i + 1 : 0 ].value, tree_0 )

console.log( 'delete ---------' )
tree_0.delete( 44 )

console.log( 'print ----------' )
console.log( 'print 0', tree_0.print() );
console.log( 'print 0', tree_0.print( 'values' ) );
console.log( 'print 1', tree_1.print() );
console.log( 'successor ------' )
console.log( 'print 0', tree_0.root );
console.log( 'print 0', tree_0.findSuccessor( 32, true ), 33 );
console.log( 'print 0', tree_0.findSuccessor( 32 ), 33 );
tree_0.findSuccessor( 33 )?.print();



//TEST 2 ( tree_1 )
console.log( '------------------- TEST 2' )

const alphabet: Array<string> = 'abcdefghijklmnopqrstuvwxyz'.split('');

let list2: Array<{ key: number, value: any }> = [];
for ( let i = 0; i < alphabet.length; i++ ) list2.push( { key: random(20,91), value:{ letter: alphabet[i], pos: i } } )

let toRemove: number = list2[random(0, alphabet.length)].key,
		toSuccessor: number = list2[random(0, alphabet.length)].key;

console.log( 'inserting items to BST' )
for ( let i = 0; i < list2.length; i++ ) tree_1.insert( list2[ i ] )

/*
console.log( 'reviewing expected' )
for ( let i = 0; i < list2.length; i++ ) expected( list2[ i ].key, list2[ i ].value, tree_1 )

console.log( 'reviewing expected 2' )
for ( let i = 0; i < list2.length; i++ ) expected( list2[ i ].key, list2[ i < list2.length - 1 ? i + 1 : 0 ].value, tree_1 )
*/

console.log( 'delete ---------' )
tree_1.delete( toRemove )

console.log( 'print ----------' )
console.log( 'print 0', tree_1.print() );
console.log( 'print 0', tree_1.print( 'values' ) );
console.log( 'successor ------' )
console.log( 'print 0', tree_1.root );
console.log( 'print 0', tree_1.findSuccessor( toSuccessor, true ), toSuccessor );
console.log( 'print 0', tree_1.findSuccessor( toSuccessor ), toSuccessor );