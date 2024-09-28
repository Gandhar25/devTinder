const express = require('express')

const app = express()

app.listen(3000, () => {
    console.log('Successfully listening to server on port 3000...!')
})

// -- routes

app.use('/hello', (req, res) => {
    res.send(`Hello Hello..! : ${req.abc}`)
})

app.use((req, res, next) => {
    console.log('middle')
    req.abc = 'hopped in between'
    next()
})

app.use('/test', (req, res) => {
    res.send(`Welcome to Test route..! : ${req.abc}`)
})

app.use((req, res) => {
    res.send('Sorry, Unfortunately the routes does not exist..!')
})