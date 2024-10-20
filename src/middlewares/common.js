const { validateFields } = require('../utils/utils')
const User = require('../models/User')


const matchApiFieldsWithSchema = (req, res, next) => {
    const isValidFields = validateFields(User, Object.keys(req.body))

    if(isValidFields) {
        next()
    } else {
        res.status(500).send('Bad request: Invalid parameters')
    }
}

module.exports = {
    matchApiFieldsWithSchema,
}