const express = require('express')
const connectDB = require('./config/database')
const User = require('./models/User')

const app = express()

app.use(express.json())

app.post('/signup', async (req, res) => {

    const user = new User(req.body);

    try {
        await user.save()
        res.send('User added successfully...!')
    } catch(err) {
        res.status(401).send('Cannot add user : ' + err.message)
    }

})

connectDB().then(() => {
    console.log('Database connection established..!')

    app.listen(3000, () => {
        console.log('Successfully listening to server on port 3000...!')
    })
}).catch((err) => {
    console.log("Couldn't connect to the database..!", err)
})