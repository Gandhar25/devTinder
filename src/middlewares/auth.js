const jwt = require('jsonwebtoken');
const User = require('../models/User');

// -- For encoding the jwt
const PRIVATE_KEY = "@Dev$Tinder#786"

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if(!token) {
            throw new Error('Invalid Token passed!!')
        }

        const decodedTokenData = await jwt.verify(token, PRIVATE_KEY)

        const { _id } = decodedTokenData;

        const user = await User.findById(_id)

        if(!user) {
            throw new Error('User not found!!')
        }

        req.user = user
        next()
    } catch (error) {
        res.send('Error : ' + error.message)
    }
}

module.exports = {
    userAuth
}