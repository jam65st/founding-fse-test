/**
 * BST Node
 *
 * @param: key (int): identifier
 * @param: value (any): the kind of object set to storage
 */
class BSTNode {
	private _key: number;
	private readonly _value: any;
	
	// edges
	private _left: BSTNode | null;
	private _right: BSTNode | null;
	
	constructor( key: number, value: any ){
		this._key   = key;
		this._value = value;
		// set edges
		this._left  = this._right = null;
		// this.print();
	}
	
	swap(){
		[ this._left, this._right ] = [ this._right, this._left ];
	}
	
	print(){ // for pretesting purposes
		type Node = {
			key: number,
			value: any,
			left: BSTNode | null,
			right: BSTNode | null,
			isLeaf: boolean,
			result: any
		}
		let tmp: Node = {
			key: this._key,
			value: this._value,
			left: this._left,
			right: this._right,
			isLeaf: this.isLeaf,
			result: this.value
		}
		console.log( 'printing BSTNode' )
		Object.entries( tmp )
		      .forEach(
							( [ key, value ] ) => console.log( `|-[ ${ key.length === 3 ? '   ' : key.length === 4 ? '  ' : key.length === 5 ? ' ' : '' }${ key } ]\t:\t${ value }` )
		      );
	}
	
	public set left( left: BSTNode | null ){ this._left = left; }
	
	public get left(): BSTNode | null{ return this._left; }
	
	public set right( right: BSTNode | null ){ this._right = right }
	
	public get right(): BSTNode | null{ return this._right; }
	
	public get key(): number { return this._key }
	
	public get value(): BSTNode | null{ return this._value }
	
	public get isLeaf(): boolean{ return this._left === null && this._right === null }
}

export default BSTNode;