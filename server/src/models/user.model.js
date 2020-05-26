const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
	firstName: {
        type: String,
        required: true
	},
	lastName: {
        type: String,
        required: true
	},
	phoneNumber: {
        type: Number,
        required: true
	},
	streetAddress: { 
        type: String,
        required: true
	},
	zipCode: {
        type: Number,
        required: true
	},
	city: {
        type: String,
        required: true
	},
	isAdmin: {
        type: Boolean,
        required: true
	},
})

const User = mongoose.model('User', userSchema)
module.exports = { User, userSchema };