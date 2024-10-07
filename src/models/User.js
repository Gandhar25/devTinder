const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
    },
    password: String,
    gender: String,
    age: {
        type: Number,
        min: 16
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User