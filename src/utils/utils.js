const validator = require('validator')

const validateFields = (model, fieldsToValidate = []) => {
    const allSchemaFeilds = Object.keys(model.schema.obj)
    let isValidFeilds

    if(fieldsToValidate.length) {
        isValidFeilds = fieldsToValidate.every(k => allSchemaFeilds.includes(k))
    }

    return isValidFeilds
}

const validateFieldsForUpdate = (fieldsToValidate = [], fieldsToSkipUpdate = []) => {
    let isUpdateAllowed = true

    if(fieldsToSkipUpdate.length) {
        isUpdateAllowed = fieldsToValidate.every(k => fieldsToSkipUpdate.includes(k))
    }

    return isUpdateAllowed
}

const validateSignUpData = (req) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body

    // [firstName, lastName, email, password].map(field => {
    //     console.log('abc', field)
    //     verifyAndThrowErrors(field, 'Missing required field', required)
    // })

    verifyAndThrowErrors(firstName, 'Please provide first name', required)

    verifyAndThrowErrors(lastName, 'Please provide last name', required)

    verifyAndThrowErrors(firstName, 'First name should be greater than 3 and less than 50', validateLength, {min: 3, max: 50})

    verifyAndThrowErrors(email, 'Please enter valid email', validateEmail)

    verifyAndThrowErrors(password, 'Please enter strong password', validatePassword)
}

const required = (field, msg) => validator.isEmpty(field) ? msg : false

const validateLength = (field, msg, options) => !validator.isLength(field, options) ? msg : false

const validateEmail = (field, msg) => !validator.isEmail(field)  ? msg : false

const validatePassword = (field, msg) => !validator.isStrongPassword(field) ? msg : false

const verifyAndThrowErrors = (field, msg, func, options) => {
    
    if(func) {
        const errorMsg = func(field, msg, options)

        if(errorMsg) {
            throw new Error(errorMsg)
        }
    }
}

module.exports = {
    validateFields,
    validateFieldsForUpdate,
    validateSignUpData
}