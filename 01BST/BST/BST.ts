import BSTNode from "./BSTNode";

class BST {
	private _root: BSTNode | null = null; // root node
	// edges
	// levels
	
	constructor(){
		console.log( 'Init BST' );
	}
	
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
	public search( node_key: number ): any{ return 'temp' }
	
	insert( value: { key:number, value: any } ): void {
		let dummy:BSTNode | null = this._root;
		this.insertNode( dummy, value );
	}
	/**
	 * Insert a node, given as input a (key, value) pair
	 * @param node {BSTNode}
	 * @param item { key: number, value: any }
	 */
	private insertNode( node: BSTNode | null, item: { key: number, value: any } ):BSTNode | void {
		console.log( '- insert', item )
		
		// If the tree is empty, assign the new node to root
		if (!node) this._root = new BSTNode( item.key, item.value );
		else {
			// If the key of the item < key of the current node
			if ( item.key <= node.key ){
				// If we reached a leaf node, we insert
				if ( !node.left ) node.left = new BSTNode( item.key, item.value );
				// Else, keep looking
				else return this.insertNode( node.left, item );
			} else {
				// If we reached a leaf node, we insert
				if ( !node.right ) node.right = new BSTNode( item.key, item.value );
				// Else, keep looking
				else return this.insertNode( node.right, item );
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