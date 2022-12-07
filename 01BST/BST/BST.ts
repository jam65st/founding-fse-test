import BSTNode from "./BSTNode";

/**
 * # BST Binary Search Tree
 * Its a data structure like a LinkedList, but based in nodes.
 * Each node is a container that stores two edges or connections:
 * lower or higher or left and right;
 * It's his binary nature or hence binary.
 *
 * One tree starts with a root node and each tree has a level quantity
 * (0 at start). A node must have one, two, or none child (leaf).
 * Each tree has a number of edges from root to the lowest level. (height)
 * A perfect tree has the same ammount of edges at every level,
 * but this isn't common.
 *
 * @author Jaime A. Mendez <jam65st@gmail.com>
 */
class BST {
	// Root node
	private _root: BSTNode | null = null;
	// edges
	// levels
	// leaf
	// height of the tree
	// perfect tree
	
	constructor(){ console.log( 'Init BST' ); }
	
	/**
	 * root
	 *
	 * returns BST Root Node
	 *
	 * @returns {BSTNode | null}
	 */
	public get root(): BSTNode | null{ return this._root }
	
	/**
	 * Search for a node, given as input a key, and output the value found on the
	 * searched node (or Null if such a node is not found)
	 * @param {number} node_key
	 * @returns {any}
	 */
	public search( node_key: number ): any{
		let dummy: BSTNode | null    = this._root;
		const result: BSTNode | null = this.findNodeInTree( dummy, node_key );
		return result !== null ? result.value : result;
	}
	
	/**
	 *
	 *
	 * @param {BSTNode | null} NodeInTree
	 * @param {number} valueToSearch
	 * @returns {BSTNode | null}
	 * @private
	 */
	private findNodeInTree( NodeInTree: BSTNode | null, valueToSearch: number ): BSTNode | null{
		return ( !NodeInTree ) ?
		       NodeInTree :
		       ( valueToSearch < NodeInTree.key ) ?
		       this.findNodeInTree( NodeInTree.left, valueToSearch ) :
		       ( valueToSearch > NodeInTree.key ) ?
		       this.findNodeInTree( NodeInTree.right, valueToSearch ) :
		       NodeInTree;
	}
	
	/**
	 * Insert a node, given as input a (key, value) pair
	 * @param {{key: number, value: any}} value
	 */
	insert( value: { key: number, value: any } ): void{
		let dummy: BSTNode | null = this._root;
		this.insertNode( dummy, value );
	}
	
	/**
	 * Insert a new node in the tree
	 *
	 * @param nodeOfTree {BSTNode}
	 * @param newNodeValue { key: number, value: any }
	 */
	private insertNode( nodeOfTree: BSTNode | null, newNodeValue: { key: number, value: any } ): BSTNode | void{
		console.log( '- insert', newNodeValue )
		
		// If the tree is empty, assign the new nodeOfTree to root
		if ( !nodeOfTree ) this._root = new BSTNode( newNodeValue.key, newNodeValue.value );
		else {
			// If the key of the newNodeValue < key of the current nodeOfTree
			if ( newNodeValue.key <= nodeOfTree.key ){
				// If we reached a leaf nodeOfTree, we insert
				if ( !nodeOfTree.left ) nodeOfTree.left = new BSTNode( newNodeValue.key, newNodeValue.value );
				// Else, keep looking
				else return this.insertNode( nodeOfTree.left, newNodeValue );
			} else {
				// If we reached a leaf nodeOfTree, we insert
				if ( !nodeOfTree.right ) nodeOfTree.right = new BSTNode( newNodeValue.key, newNodeValue.value );
				// Else, keep looking
				else return this.insertNode( nodeOfTree.right, newNodeValue );
			}
		}
	}
	
	/**
	 * Delete all nodes having a certain key, given as input a key
	 * @param {number} node_branch_to_remove
	 */
	public delete( node_branch_to_remove: number ){}
	
	/**
	 * Print all keys in the tree in sorted order
	 * @returns {any[]}
	 */
	public print(): any[]{
		if ( !this._root ) return [];
		return [ 0, 1, 2, 3 ]
	}
	
	public given( node_key: number ){}
}

export default BST;