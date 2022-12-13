/**
 * **Note** For testing purposes we import fake data from:
 * ../data/sample.users.json
 *
 * TODO: It must be removed when you connect your MONGODB
 *
 */
const hash64 = require( '../../domain/utils/hash64' );


/**
 * # InMemoryDB
 * This is a pseudo database, that uses a json file as provider
 * ONLY for testing purposes!!!
 *
 * @param useFakeData  to starts empty or use the sample data
 *
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
		console.log( 'new [InMemoryDB]', this.#DB )
		
		// Add Fake Users
		if ( useFakeData ){
			this.#DB = require( './data/sample.users.json', { type: 'json' } );
			setTimeout( console.log, 5000, this._msg() );
		} else {
			console.log( '\tNO DB' )
		}
	}
	
	// TODO:  Remove IT and their usages
	_msg(){ return `[DB] I have ${ this.#DB.users.length } users` }
	
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
		console.log( this._msg() );
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
	 *
	 * @param id {number}
	 * @return {boolean}
	 */
	removeUser( id = -1 ){
		
		let users = this.totalUsers,
		    index = this.#getUserIdIndex( id );
		
		console.log( index, users, id, this.#DB.users[ index ] );
		
		this.#DB.users = [
			...this.#DB.users.slice( 0, index ),
			...this.#DB.users.slice( index + 1 )
		];
		
		/*
		 if ( index === 0 ) this.#DB.users = [ ...this.#DB.users.slice( 1 ) ]
		 if ( index === users - 1 ) this.#DB.users = [ ...this.#DB.users.slice( 0, index - 1 ) ]
		 if ( index > 0 && index < users - 1 ) this.#DB.users = [
		 this.#DB.users.slice( 0, index ),
		 ...this.#DB.users.slice( index + 1 )
		 ];*/
		
		
		console.log( this._msg() );
		console.table( this.#DB.users )
		return users !== this.totalUsers;
	}
	
	#getUserIdIndex( id ){
		for ( let i = 0; i < this.#DB.users.length; i++ ) if ( this.#DB.users[ i ].Id === id ) return i;
		return -1;
	}
	
	/**
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
	 * Uses #isUniqueUserField to find duplicates or not in the field **Id**
	 *
	 * @param ID
	 * @return {boolean}
	 */
	isUniqueUserID( ID ){ return this.#isUniqueUserField( 'Id', ID ) }
	
	/**
	 * ## isUniqueUserEmail
	 * Uses #isUniqueUserField to find duplicates or not in the field **Email**
	 *
	 * @param email
	 * @return {boolean}
	 */
	isUniqueUserEmail( email ){ return this.#isUniqueUserField( 'Email', email ) }
	
	/**
	 * ## #isUniqueUserField
	 * Search any iteration of the value in users collection from database
	 *
	 * @param field
	 * @param value
	 * @return {boolean}
	 * @private
	 */
	#isUniqueUserField( field, value ){
		for ( let i = 0; i < this.#DB.users.length; i++ ){
			if ( this.#DB.users[ i ][ field ] === value ) return false;
		}
		return true;
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