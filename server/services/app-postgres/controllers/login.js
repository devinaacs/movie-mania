const { User } = require('../models');
const { compareHash } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');


class Controller {
    //ADMIN LOGIN FORM
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email }
            })
            if (!user) {
                throw { name: "INVALID_EMAIL_PASSWORD" }
            }
            if (!compareHash(password, user.password)) {
                throw { name: "INVALID_EMAIL_PASSWORD" }
            }
            const payload = {
                id: user.id,
                name: user.username,
                email: user.email
            }
            const token = createToken(payload)
            res.status(200).json({
                access_token: token
            })
        } catch (err) {
            next(err)
        }
    }

    //ADMIN REGISTER FORM
    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const newUser = await User.create({
                username: username,
                email: email,
                password: password,
                role: "Admin",
                phoneNumber: phoneNumber,
                address: address
            })

            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller