const express = require('express')
const connectDB = require('./config/database')
const bcrypt = require('bcrypt')
const validator = require('validator')


const User = require('./models/User')

const {
    matchApiFieldsWithSchema
} = require('./middlewares/common')

const { 
    validateFieldsForUpdate,
    validateSignUpData
} = require('./utils/utils')

const app = express()



app.use(express.json())

app.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body

    try {
        if(!validator.isEmail(email)) {
            throw new Error('Please enter a valid email')
        }

        const user = await User.findOne({ email })

        if(!user) {
            throw new Error('Invalid credentials')
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) {
            throw new Error('Invalid credentials')
        } else {
            res.status(200).send('Login Successfull')
        }

    } catch (error) {
        res.status(401).send(error.message)
    }

})


// API - For posting user signup data
app.post('/signup',
    // -- validate api fields with schema
    matchApiFieldsWithSchema,
    async (req, res) => {
        try {
            // -- validate data from api
            validateSignUpData(req)

            // -- Encrypt password
            const encryptedPassword = await bcrypt.hash(req.body.password, 10)
            req.body.password = encryptedPassword

            const user = new User(req.body);
            await user.save()

            res.send('User added successfully...!')
        } catch(err) {
            res.status(401).send('Cannot add user : ' + err.message)
        }
    }
)

//API - for getting all users data
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})

        if(users.length === 0) {
            res.send('No data available..!')
        } else {
            res.send(users)
        }
    } catch (error) {
        res.send('Something went wrong...!' + error)
    }

})

// API - for getting single user data
app.get('/user', async (req, res) => {
    try {
        const userEmail = req.body.email;

        const users = await User.find({ email: userEmail })

        if(users.length === 0) {
            res.send('No match found..!')
        } else {
            res.send(users)
        }
    } catch (error) {
        res.send('Something went wrong...!' + error)
    }
})

//API - for deleting user data
app.delete('/user' , async (req, res) => {
    try{
        const userId = req.body.userId
        const result = await User.findByIdAndDelete(userId)

        if(result) {
            res.send('User deleted successfully')
        } else {
            res.send('Cannot find User to perform delete operation')
        }

    } catch(err) {
        res.send('Something went wrong...!' + err)
    }
})

app.patch('/user', (req, res, next) => {
    
    const updatedData = req.body
    const FIELDS_TO_SKIP = ["email", "age"]

    const isValidFields = validateFieldsForUpdate(Object.keys(updatedData), FIELDS_TO_SKIP)

    if(isValidFields) {
        next()
    } else {
        res.status(500).send('Cannot update document')
    }
}, async (req, res) => {
    try {
        const userId = req.body.userId
        const updatedData = req.body

        const doc = await User.findById(userId);

        const hasCreatedAt = !doc.createdAt

        const options = {
            runValidators: true,
            ...(hasCreatedAt ? {
                timestamps: false,
                strict: false
            } : {})
        }

        const data = {
            ...updatedData,
            ...(hasCreatedAt ? {
                createdAt: new Date(),
                updatedAt: new Date()
            } : {})
        }

        const oldData = await User.findByIdAndUpdate(userId, data, options)

        if(oldData) {
            res.send('User updated successfully')
        } else {
            res.send('Cannot find User to perform update operation')
        }

    } catch (error) {
        res.send('Something went wrong...!' + error)
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