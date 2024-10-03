const express = require('express')

const app = express()

app.listen(3000, () => {
    console.log('Successfully listening to server on port 3000...!')
})

// -- routes

const authenticateClient = (req, res, next) => {
    const token = 'pqr'
    const isAuthenticatedUse =  token === 'abc'

    if(!isAuthenticatedUse) {
        res.send('Authentication failed', 401)
    } else {
        next()
    }
}

app.use('/admin', authenticateClient)

app.use('/admin/getAllData', (req, res) => {
    res.send('Sent all user data..!')
})

app.use('/admin/deleteUserData', (req, res) => {
    res.send('Deleted user data..!')
})

app.use('/user/updateProfile', authenticateClient, (req, res) => {
    res.send('Profile updated suceessfully..!')
})

app.use('/user/signUp', (req, res) => {
    res.send('Signed up suceessfully..!')
})