/**
 * # BST Node
 * It is any element inside a BST Binary Search Tree
 *
 * @param: key (int): identifier
 * @param: value (any): the kind of content to storage
 * @author: Jaime A. Mendez <jam65st@gmail.com>
 * @date: 2022-12-08
 */
class BSTNode {
	// PRIVATE PROPERTIES
	/**
	 * **_key**
	 * Node identifier
	 *
	 * @type {number}
	 * @private
	 */
	private readonly _key: number;
	
	/**
	 * **_value**
	 * Node content
	 *
	 * @type {any}
	 * @private
	 */
	private readonly _value: any;
	
	// EDGES
	/**
	 * **_left** (edge)
	 * Lower value
	 *
	 * @type {BSTNode | null}
	 * @private
	 */
	private _left: BSTNode | null;
	
	/**
	 * **_right** (edge)
	 * Higher value
	 *
	 * @type {BSTNode | null}
	 * @private
	 */
	private _right: BSTNode | null;
	
	// CONSTRUCTOR
	constructor( key: number, value: any ){
		this._key   = key;
		this._value = value;
		// set edges
		this._left  = this._right = null;
		// this.print();
	}
	
	// GETTERS & SETTERS
	/**
	 * ## left (property)
	 * Allow to set or get the lower edge of this node
	 *
	 * @param {BSTNode | null} left
	 */
	public set left( left: BSTNode | null ){ this._left = left; }
	
	public get left(): BSTNode | null{ return this._left; }
	
	/**
	 * ## right (property)
	 * Allow to set or get the higher edge of this node
	 *
	 * @param {BSTNode | null} right
	 */
	public set right( right: BSTNode | null ){ this._right = right }
	
	public get right(): BSTNode | null{ return this._right; }
	
	/**
	 * ## key (property)
	 * (ReadOnly) Reports or allow to get the current identifier (key) of this node.
	 *
	 * @returns {number}
	 */
	public get key(): number{ return this._key }
	
	/**
	 * ## value (property)
	 * (ReadOnly) Reports or allow to get the current content (value) of this node.
	 *
	 * @returns {BSTNode | null}
	 */
	public get value(): BSTNode | null{ return this._value }
	
	/**
	 * ## isLeaf (property)
	 * (ReadOnly) Reports or allow to know if this node doesn't have any edge or child
	 *
	 * @returns {boolean}
	 */
	public get isLeaf(): boolean{ return this._left === null && this._right === null }
	
	/**
	 * ## hasLeftChildOnly (property)
	 * (ReadOnly) Reports or allow to know if this node only have a lower edge or left child
	 *
	 * @returns {boolean}
	 */
	public get hasLeftChildOnly(): boolean{ return this._left !== null && this._right === null }
	
	/**
	 * ## hasRightChildOnly (property)
	 * (ReadOnly) Reports or allow to know if this node only have a higher edge or right child
	 *
	 * @returns {boolean}
	 */
	public get hasRightChildOnly(): boolean{ return this._left === null && this._right !== null }
	
	/**
	 * ## hasChildren (property)
	 * (ReadOnly) Reports or allow to know if this node have both edges or children (lower | left, higher | right)
	 *
	 * @returns {boolean}
	 */
	public get hasChildren(): boolean{ return this._left !== null && this._right !== null }
	
	// METHODS
	/**
	 * ## mostLeft (function)
	 * This method allow to find the most left item.
	 * It method is used by BST.delete || BST deleteNodeInTree
	 *
	 * @param {BSTNode | null} node
	 * @returns {BSTNode | null}
	 */
	public mostLeft( node: BSTNode | null ): BSTNode | null{
		return ( node && !node.left ) ?
		       this :
		       ( node && !node.left ) ?
		       this.mostLeft( node.left ) :
		       null;
	}
	
	/**
	 * ## printNodeKey (function)
	 * This method explores the node and their children (edges) to find
	 * to return the ordered list of all keys (identifiers) in the BST
	 *
	 * @param {number[]} destin  DO NOT INITIALIZE THIS PARAMETER. It is only required by the child nodes
	 * @returns {number[]}
	 */
	public printNodeKey( destin: number[] = [] ): number[]{
		let result: number[] = [];
		result.push( this._key );
		
		if ( this._left ) result = this._left.printNodeKey( result ).concat( result );
		if ( this._right ) result = result.concat( this._right.printNodeKey( result ) );
		
		return result;
	}
	
	/**
	 * ## printNodeKey (function)
	 * This method explores the node and their children (edges) to find
	 * to return the ordered list of all values (contents) in the BST
	 *
	 * @param {number[]} destin  DO NOT INITIALIZE THIS PARAMETER. It is only required by the child nodes
	 * @returns {any[]}
	 */
	public printNodeValue( destin: number[] = [] ): any[]{
		let result: any[] = [];
		result.push( this._value );
		
		if ( this._left ) result = this._left.printNodeValue( result ).concat( result );
		if ( this._right ) result = result.concat( this._right.printNodeValue( result ) );
		
		return result;
	}
	
	// HELPER
	print(){ console.log( 'print', this !== null ? this : 'none' ) }
}

export default BSTNode;