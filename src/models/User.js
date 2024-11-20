const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// -- For encoding the jwt
const PRIVATE_KEY = "@Dev$Tinder#786"

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

userSchema.methods.getJWT = async function() {
    const token = await jwt.sign({ _id: this._id }, PRIVATE_KEY)

    return token
}

userSchema.methods.validatePassword = async function(enteredPassword) {
    const isValidPassword = await bcrypt.compare(enteredPassword, this.password)

    return isValidPassword
}

const User = mongoose.model('User', userSchema)

module.exports = User