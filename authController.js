const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secretAccessKey} = require('./config')

const generateAccessToken = (id, roles) => {
    const payload = {id, roles};
    return jwt.sign(payload, secretAccessKey, {expiresIn: '24h'});
};

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({message: 'Registration errors', errors});
            const {username, password} = req.body;
            const isHaveUser = await User.findOne({username});
            if (isHaveUser) return res.status(400).json({message: 'User already exist'});
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'});
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return res.json({message: 'User successful registered'})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) return res.status(400).json({message: `User ${username} was not found`});
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) return res.status(400).json({message: `Wrong password`});
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }

    async getUsers(req, res) {
        try {
            // mock creation of roles:
            /*
            * const userRole = new Role();
            * const adminRole = new Role({value: 'ADMIN'});
            * await userRole.save();
            * await adminRole.save();
            */
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }
}

module.exports = new AuthController();