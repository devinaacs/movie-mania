const User = require('../model/user');

class Controller {
    static async listUser(req, res) {
        try {
            const user = await User.findAll()

            user.forEach(e => {
                delete e.password
            })

            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async findUser(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findByPk(id)

            if (!user) throw { name: "NOT_FOUND" }

            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                address: user.address
            })
        } catch (err) {
            next(err)
        }
    }

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

            const user = await User.findByPkWithoutObjectId(newUser.insertedId)

            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                address: user.address
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params

            const user = await User.findByPk(id)

            if (!user) throw { name: "NOT_FOUND" }

            const deletedUser = await User.destroy(id)

            res.status(200).json({
                message: `User ${user.username} has been deleted successfully.`
            })
        } catch (err) {
            next(err)
        }
    }
}


module.exports = Controller