// import BSTNode from "./BST/BSTNode";
import BST from "./BST/BST";

//const initial_node = new BSTNode( 93, 'hello' );

// Pretest Basic Node
/*
	console.log( 'left', initial_node.left )
	console.log( 'right', initial_node.right )
	console.log( 'isLeaf', initial_node.isLeaf )
	console.log( 'result', initial_node.node )
*/

// const alphabet: Array<string> = 'abcdefghijklmnopqrstuvwxyz'.split('');

let tree_0 = new BST(),
    tree_1 = new BST();
/*console.log( 'print 0', tree_0.print() );
console.log( 'print 0', tree_0.root );
console.log( 'print 1', tree_1.print() );
console.log( 'print 1', tree_1.root );*/
/*
tree_0.insert({ key:94, value:'hello' } );
tree_0.insert({ key:33, value:'world' } );
tree_0.insert({ key:125, value:'where' } );
tree_0.insert({ key:68, value:'is' } );
tree_0.insert({ key:44, value:'my' } );
tree_0.insert({ key:32, value:'smile' } );
*/

let list: Array<{ key:number, value:any }> = [
	{ key:94, value:'hello' },
	{ key:33, value:'world' },
	{ key:125, value:'where' },
	{ key:68, value:'is' },
	{ key:44, value:'my' },
	{ key:32, value:'smile' }
];

const expected = ( value: number, exp: any ):any | null => {
	let result = tree_0.search( value );
	console.log( `testing: ${value} | get: ${result} | exp: ${exp} | result: ${ result === exp }` );
	return result;
};

console.log( 'inserting items to BST' )
for( let i=0; i <list.length; i++ ) tree_0.insert( list[i] )

console.log( 'reviewing expected' )
for( let i=0; i <list.length; i++ ) expected( list[i].key, list[i].value )

console.log( 'reviewing expected 2' )
for( let i=0; i <list.length; i++ ) expected( list[i].key, list[ i < list.length - 1 ? i + 1 : 0 ].value )

console.log('delete ---------')
// tree_0.delete( 44 )

console.log( 'print ----------')
console.log( 'print 0', tree_0.print() );
console.log( 'print 0', tree_0.print('values') );
console.log( 'print 1', tree_1.print() );