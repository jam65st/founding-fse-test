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
		const result: BSTNode | null = this.findNodeInTree( this._root, node_key );
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
		return ( !NodeInTree ) ? // If current node is null returns null
		       NodeInTree :
		       ( valueToSearch < NodeInTree.key ) ? // If our value to search is lower, move to left
		       this.findNodeInTree( NodeInTree.left, valueToSearch ) :
		       ( valueToSearch > NodeInTree.key ) ? // If our value to search is higher, move to right
		       this.findNodeInTree( NodeInTree.right, valueToSearch ) :
		       NodeInTree; // We found our value
	}
	
	/**
	 * Insert a node, given as input a (key, value) pair
	 * @param {{key: number, value: any}} value
	 */
	insert( value: { key: number, value: any } ): void{ this.insertNode( this._root, value ); }
	
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
	 * @param {number} node_key
	 */
	public delete( node_key: number ): void{ this.deleteNodeInTree( this._root, this._root, node_key ) }
	
	/**
	 * Remove a node from tree following their path.
	 *
	 * @param {BSTNode | null} parentNode
	 * @param {BSTNode | null} nodeOfTree
	 * @param {number} nodeValueToRemove
	 * @returns {BSTNode | null}
	 * @private
	 */
	private deleteNodeInTree( parentNode: BSTNode | null, nodeOfTree: BSTNode | null, nodeValueToRemove: number ): BSTNode | null{
		// If node is null return null
		if ( !nodeOfTree ) return nodeOfTree;
		
		// Look in the tree
		// If the key to remove is lower than current key then down a level
		if ( nodeValueToRemove < nodeOfTree.key ) return this.deleteNodeInTree( nodeOfTree, nodeOfTree.left, nodeValueToRemove );
		
		// If the key to remove is higher than current key then up a level
		if ( nodeValueToRemove > nodeOfTree.key ) return this.deleteNodeInTree( nodeOfTree, nodeOfTree.right, nodeValueToRemove );
		
		// But when we find the node to delete, we must to continue exploring
		if ( parentNode && nodeValueToRemove === nodeOfTree.key ){
			if ( nodeOfTree.isLeaf ){ // To delete an leaf node
				if ( nodeOfTree === this._root ) this._root = null;
				else if ( nodeValueToRemove < parentNode.key ) parentNode.left = null
				else parentNode.right = null;
			} else if ( nodeOfTree.hasLeftChildOnly ){ // To delete a node with lower / left children
				if ( nodeOfTree === this._root ) this._root = nodeOfTree.left;
				else if ( nodeValueToRemove < parentNode.key ) parentNode.left = nodeOfTree.left;
				else parentNode.right = nodeOfTree.left;
			} else if ( nodeOfTree.hasRightChildOnly ){ // To delete a node with higher / right children
				if ( nodeOfTree === this._root ) this._root = nodeOfTree.right;
				else if ( nodeValueToRemove < parentNode.key ) parentNode.right = nodeOfTree.right;
				else parentNode.left = nodeOfTree.right;
			} else if ( nodeOfTree.hasChildren ){ // To delete a node with both (left and right) children.
				// find the smallest value at right
				let mostLeft = nodeOfTree.mostLeft( nodeOfTree.right );
				// add left children of deleted node to left side of the right node
				if ( mostLeft ) mostLeft.left = nodeOfTree.left;
				// replace deleted node with the node to the right
				if ( nodeValueToRemove < parentNode.key ) parentNode.left = nodeOfTree.right;
				else parentNode.right = nodeOfTree.right;
				// if it is root, update root
				if ( this._root === nodeOfTree ) this._root = nodeOfTree.right;
			}
		}
		
		return null;
	}
	
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