/*
 const mongoose = require( 'mongoose' );
 const Schema   = mongoose.Schema;
 
 const userSchema = new Schema( {
 Id: String,
 Name: String,
 Email: String
 }, { _id: false } );
 */

const Validators = require( './users_validators' );

const userSchema = {
	Id: {
		type: "string",
		required: true,
		index: {
			unique: true
		}
		//, default: hash64.defaultEncoded()
	},
	Name: {
		type: "string",
		required: true,
		index: {
			unique: false
		}
	},
	Email: {
		type: "string",
		required: true,
		index: {
			unique: true
		},
		lowercase: true,
		validate: {
			type: 'regex',
			value: Validators.EMAIL
		}
	},
	ValidEmail: {
		type: "boolean",
		required: true
	}
}

module.exports.userSchema = userSchema;