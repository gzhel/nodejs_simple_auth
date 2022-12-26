const {check} = require('express-validator');

const registrationValidator = [
    check('username', 'User name cannot be empty').notEmpty(),
    check('password', 'Password should be 4-10 characters').isLength({min: 4, max: 10})
]

const authValidator = {
    registrationValidator,
}

module.exports = authValidator;