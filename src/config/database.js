const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(
        'mongodb+srv://gsawant2468:gsawant%402468@cluster0.4gmuc.mongodb.net/devTinder'
    )
}

module.exports = connectDB

