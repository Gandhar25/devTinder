const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ['male', 'female', 'other']
    },
    age: {
        type: Number,
        min: 18
    },
    skills: {
        type: [String]
    },
    avatar: {
        type: String,
        default: '/Dummy.png' 
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User