/**
 * **Note** For testing purposes we import fake data from:
 * ../data/sample.users.json
 *
 * TODO: It must be removed when you connect your MONGODB
 * and implement your middleware
 *
 */
const hash64 = require( '../../domain/utils/hash64' );


/**
 * # InMemoryDB
 * This is a pseudo database, that uses a json file as provider
 * ONLY for testing purposes!!!
 *
 * @param useFakeData  to starts empty or use the sample data
 * @author: Jaime Mendez <jam65st@gmail.com>
 */
class InMemoryDB {
	/**
	 *
	 * @type {[]}
	 * @private
	 */
	#DB;
	
	/**
	 *
	 * @param useFakeData
	 * @constructor
	 */
	constructor( useFakeData = false ){
		
		// Add Fake Users
		if ( useFakeData ) this.#DB = require( './data/sample.users.json', { type: 'json' } );
		// TODO: built in singleton,
		//  init from scratch
		//  and split middleware methods eg:
		//  this.#DB = {
		//    __main:{},
		//    users:[],
		//    appTokens:[],
		//    collectionA: [], collectionB:[]...
		//  }
		//  this.#setFirstIndex
		
		console.log( `- New [InMemoryDB]: ${ this.#DB }` )
	}
	
	// MIDDLEWARE IN DB
	/**
	 * ## addUser
	 * 1 DB Assume that data is Valid, model test mus be made first
	 *
	 * @param userData
	 * @return {boolean}
	 */
	addUser( userData ){
		let users = this.totalUsers;
		this.#DB.users.push( userData );
		return users !== this.totalUsers;
	}
	
	/**
	 * ## newUserID
	 *
	 * Return a valid unique identifier for an user
	 * based in the current date with a millisecond precision.
	 * @return {string|*}
	 */
	get newUserID(){ return hash64.defaultEncoded() }
	
	/**
	 * ## canBeUserID
	 * Test an expression to verify if it can be an user:Id or not
	 *
	 * @param exp {string}
	 * @return {boolean}
	 */
	canBeUserID( exp ){
		let test  = hash64.decode64( exp ),
		    first = this.#getFirstIndex(),
		    now   = Date.now();
		return test >= first && test <= now;
	}
	
	/**
	 * ## #getFirstIndex
	 * return the first index or date of DataBaseInit
	 *
	 * @param asNum {boolean} return your answer as Number(true) or String (false)
	 * @return {number|*|string}
	 * @private
	 */
	#getFirstIndex( asNum = true ){
		let result = ( this.#DB.__main && this.#DB.__main.firstIndex ) ? this.#DB.__main.firstIndex : '';
		return result === ''
		       ? this.#setFirstIndex( asNum )
		       : asNum
		         ? hash64.decode64( result )
		         : result;
	}
	
	/**
	 * ## #setFirstIndex
	 * Creates the first index of DB and returns it
	 *
	 * @param asNum {boolean} return your answer as Number(true) or String (false)
	 * @return {number|*} return the first index or date of DataBaseInit
	 */
	#setFirstIndex( asNum = true ){
		if ( !this.#DB.__main ) this.#DB.__main = {}
		
		if ( !this.#DB.__main.firstIndex || !this.#DB.__main.firstIndex !== '' ){
			
			// ONLY ONCE can happen it
			if ( this.#DB.users.length === 0 )
				this.#DB.__main.firstIndex = hex64.defaultEncoded();
			else {
				let min = hash64.decode64( this.#DB.users[ 0 ].Id ),
				    Id  = this.#DB.users[ 0 ].Id,
				    it;
				
				for ( let i = 0; i < this.#DB.users.length; i++ ){
					it = hash64.decode64( this.#DB.users[ i ].Id )
					if ( it < min ) [ min, Id ] = [ it, this.#DB.users[ i ].Id ]
				}
				
				this.#DB.__main.firstIndex = Id;
			}
		}
		
		return asNum
		       ? hash64.decode64( this.#DB.__main.firstIndex )
		       : this.#DB.__main.firstIndex
	}
	
	/**
	 * ##removeUser
	 * Return if it can delete a user and updates DB
	 *
	 * @param id {number}
	 * @return {boolean}
	 */
	removeUser( id = -1 ){
		
		let users = this.totalUsers,
		    index = this.#getUserIdIndex( id );
		
		this.#DB.users = [
			...this.#DB.users.slice( 0, index ),
			...this.#DB.users.slice( index + 1 )
		];
		
		return users !== this.totalUsers;
	}
	
	/**
	 * ## #getUserIdIndex
	 *
	 * @param id {string} (hash64 encoded)
	 * @return {number}
	 */
	#getUserIdIndex( id ){
		for ( let i = 0; i < this.#DB.users.length; i++ )
			if ( this.#DB.users[ i ].Id === id )
				return i;
		
		return -1;
	}
	
	/**
	 * ## totalUsers
	 *
	 * returns the number of all users in DB
	 * @return {number}
	 */
	get totalUsers(){ return this.#DB.users.length }
	
	/**
	 * ## verifyToken
	 * Review if a token is valid and return their grants
	 *
	 * @param token
	 * @return {*|boolean} grants or false
	 */
	verifyToken( token ){
		let test = this.#DB.appTokens[ token ];
		return test ? test : false;
	}
	
	/**
	 * ## isUniqueUserID
	 * Uses #isUniqueUserByKey to find duplicates or not in the field **Id**
	 *
	 * @param ID
	 * @return {boolean}
	 */
	isUniqueUserID( ID ){ return this.#isUniqueUserByKey( 'Id', ID ) }
	
	/**
	 * ## isUniqueUserEmail
	 * Uses #isUniqueUserByKey to find duplicates or not in the field **Email**
	 *
	 * @param email
	 * @return {boolean}
	 */
	isUniqueUserEmail( email ){ return this.#isUniqueUserByKey( 'Email', email ) }
	
	/**
	 * ## #isUniqueUserByKey
	 * Search any iteration of the value in users collection from database
	 *
	 * @param key {string}
	 * @param value {string|number}
	 * @return {boolean}
	 * @private
	 */
	#isUniqueUserByKey( key, value ){
		for ( let i = 0; i < this.#DB.users.length; i++ ){
			if ( this.#DB.users[ i ][ key ] === value ) return false;
		}
		return true;
	}
	
	/**
	 * ## getUser
	 * performs a search on DB according to a **key** criteria
	 * with an expected **value** to search
	 *
	 * @param key {string}
	 * @param value {string}
	 * @return {[{}]}
	 */
	getUser( key, value ){
		return key === 'any'
		       ? this.#getUserByAny( value )
		       : ( key === 'Name' )
		         ? this.#getUserByName( value )
		         : this.#getUserByKey( key, value );
	}
	
	/**
	 * ## #getUserByKey
	 * Search any iteration of the value in users collection from database
	 *
	 * @param key {string}
	 * @param value {string|number}
	 * @return {[{}]}
	 * @private
	 */
	#getUserByKey( key, value ){
		for ( let i = 0; i < this.#DB.users.length; i++ )
			if ( this.#DB.users[ i ][ key ] === value )
				return [ this.#DB.users[ i ] ];
		
		return [];
	}
	
	/**
	 * ## #getUserByName
	 * Search to find incidences of a name or expression in the usernames
	 *
	 * @param name {string}
	 * @return {[{}]}
	 * @private
	 */
	#getUserByName( name ){
		let result = [];
		name       = name.toLowerCase();
		
		for ( let i = 0; i < this.#DB.users.length; i++ )
			if ( this.#DB.users[ i ].Name
			                        .toLowerCase()
			                        .indexOf( name ) !== -1 )
				result.push( this.#DB.users[ i ] );
		
		return result;
	}
	
	/**
	 * ## #getUserByAny
	 * Search to find incidences of a name or expression in the usernames
	 *
	 * @param search {string}
	 * @return {*[]}
	 * @private
	 */
	#getUserByAny( search ){
		let [ names, emails, current ] = [ [], [], false ];
		search                         = search.toLowerCase();
		
		for ( let i = 0; i < this.#DB.users.length; i++ ){
			current = false;
			
			if ( this.#DB.users[ i ].Name
			                        .toLowerCase()
			                        .indexOf( search ) !== -1 ){
				names.push( this.#DB.users[ i ] );
				current = true;
			}
			
			if ( this.#DB.users[ i ].Email.indexOf( search ) !== -1 && !current )
				emails.push( this.#DB.users[ i ] );
		}
		
		return [ ...names, ...emails ];
	}
	
	/**
	 * ## verifyUserEmailData
	 *
	 * @param knewData {Id: string, Email:String} search parameters
	 * @return {number} current status of verification
	 */
	verifyUserEmailData( knewData ){
		for ( let i = 0; i < this.#DB.users.length; i++ ){
			if ( this.#DB.users[ i ].Id === knewData.Id ||
					this.#DB.users[ i ].Email === knewData.Email
			){
				if ( this.#DB.users[ i ].Id !== knewData.Id ) return 103
				if ( this.#DB.users[ i ].Email !== knewData.Email ) return 104
				if ( this.#DB.users[ i ].Id === knewData.Id &&
						this.#DB.users[ i ].Email === knewData.Email ){
					if ( this.#DB.users[ i ].ValidEmail === true ) return 101
					this.#DB.users[ i ].ValidEmail = true
					return 100
				}
			}
		}
		return 105;
	}
}

module.exports = InMemoryDB;