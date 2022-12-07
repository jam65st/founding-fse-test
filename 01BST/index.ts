import BSTNode from "./BST/BSTNode";
import BST from "./BST/BST";

//const initial_node = new BSTNode( 93, 'hello' );

// Pretest Basic Node
/*
	console.log( 'left', initial_node.left )
	console.log( 'right', initial_node.right )
	console.log( 'isLeaf', initial_node.isLeaf )
	console.log( 'result', initial_node.node )
*/

const alphabet: Array<string> = 'abcdefghijklmnopqrstuvwxyz'.split('');

let tree_0 = new BST(),
    tree_1 = new BST();
/*console.log( 'print 0', tree_0.print() );
console.log( 'print 0', tree_0.root );
console.log( 'print 1', tree_1.print() );
console.log( 'print 1', tree_1.root );*/

tree_0.insert({ key:94, value:'hello' } );
tree_0.insert({ key:33, value:'world' } );
tree_0.insert({ key:125, value:'where' } );
tree_0.insert({ key:68, value:'is' } );
tree_0.insert({ key:44, value:'my' } );
tree_0.insert({ key:32, value:'smile' } );

