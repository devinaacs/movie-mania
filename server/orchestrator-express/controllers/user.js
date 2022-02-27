const axios = require('axios');

class Controller {
    static async getAllUsers(req, res, next) {
        try {
            const { data: users } = await axios({
                method: 'GET',
                url: 'http://localhost:4001/users'
            })
            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    }

    static async findUserById(req, res, next) {
        try {
            const { id } = req.params
            const { data: user } = await axios({
                method: 'GET',
                url: `http://localhost:4001/users/${id}`
            })
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }

    static async createUser(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const data = { username, email, password, phoneNumber, address }
            const { data: user } = await axios({
                method: 'POST',
                url: `http://localhost:4001/users`,
                data: data
            })
            res.status(201).json(user)
        } catch (err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params
            const { data: user } = await axios({
                method: 'delete',
                url: `http://localhost:4001/users/${id}`
            })
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller