const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const personSchema = mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required:true,
		unique:true
	},
	number: {
		type: String,
		required:true,
		minLength: 8
	}
})

personSchema.plugin(uniqueValidator)

personSchema.set("toJSON", {
	transform: function(document, returnedObject) {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})


const Person = mongoose.model("person", personSchema)

module.exports = Person

