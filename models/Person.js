const mongoose = require("mongoose")

const personSchema = mongoose.Schema({
    name: String,
    number: Number
})

personSchema.set("toJSON", {
    transform: function(document, returnedObject) {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model("person", personSchema)

module.exports = Person

