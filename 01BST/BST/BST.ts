import BSTNode from "./BSTNode";

class BST {
	private _root: BSTNode | null = null; // root node
	// edges
	// levels
	
	constructor( node: { key: number, value: any } | null = null ){
		if( node !== null ){
			this._root = new BSTNode( node.key, node.value )
		} else {
			this._root = node;
		}
	}
	
	/**
	 * Search for a node, given as input a key, and output the value found on the
	 * searched node (or Null if such a node is not found)
	 * @param {number} node_key
	 * @returns {any}
	 */
	public search( node_key: number ): any{ return 'temp' }
	
	/**
	 * Insert a node, given as input a (key, value) pair
	 * @param {{key: number, value: any}} input_node
	 */
	public insert( input_node: { key: number, value: any } | BSTNode ){}
	
	/**
	 * Delete all nodes having a certain key, given as input a key
	 * @param {number} node_branch_to_remove
	 */
	public delete( node_branch_to_remove: number ){}
	
	/**
	 * Print all keys in the tree in sorted order
	 * @returns {any[]}
	 */
	public print(): any[]{ return [ 0, 1, 2, 3 ] }
	
	public given( node_key: number ){}
}

export default BST;