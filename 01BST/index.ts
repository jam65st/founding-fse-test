import BSTNode from "./BST/BSTNode";
import BST from "./BST/BST";

const initial_node = new BSTNode( 93, 'hello' );

// Pretest Basic Node
console.log( 'left', initial_node.left )
console.log( 'right', initial_node.right )
console.log( 'isLeaf', initial_node.isLeaf )
console.log( 'result', initial_node.node )


let tree_0 = new BST();
console.log( 'print', tree_0.print() );

