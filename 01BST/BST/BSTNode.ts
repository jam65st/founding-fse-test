/**
 * BST Node
 *
 * @param: key (int): identifier
 * @param: value (any): the kind of object set to storage
 */
class BSTNode {
	private _key: number;
	private _value: any;
	
	// edges
	private _left: BSTNode | null;
	private _right: BSTNode | null;
	
	constructor( key: number, value: any ){
		this._key   = key;
		this._value = value;
		this._left  = this._right = null;
	}
	
	swap(){
		[ this._left, this._right ] = [ this._right, this._left ];
	}
	
	public set left( left: BSTNode | null ){ this._left = left; }
	
	public get left(): BSTNode | null{ return this._left; }
	
	public set right( right: BSTNode | null ){ this._right = right }
	
	public get right(): BSTNode | null{ return this._right; }
	
	public get node(): BSTNode | null{ return this._value }
	
	public get isLeaf(): boolean{ return this._left === null && this._right === null }
}

export default BSTNode;