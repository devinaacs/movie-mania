const { User } = require('../models');

class Controller {
    static async listUser(req, res, next) {
        try {
            const user = await User.findAll({
                order: ['id'],
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            })
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }

    static async findUser(req, res, next) {
        try {
            const id = req.currentUser.id
            const user = await User.findOne({
                where: { 'id': id },
                attributes: { exclude: ['password'] }
            })

            if (!user) throw { name: "NOT_FOUND" }

            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }

    static async editUser(req, res, next) {
        try {
            const { id } = req.params
            const { username, email, phoneNumber, address } = req.body
            const newData = { username, email, phoneNumber, address }
            const user = await User.findByPk(id)

            if (!user) throw { name: "NOT_FOUND" }

            const updatedUser = await User.update(newData, {
                where: { id },
                returning: true
            })

            const data = updatedUser[1][0]

            res.status(200).json({
                "id": data.id,
                "username": data.username,
                "email": data.email,
                "role": data.role,
                "phoneNumber": data.phoneNumber,
                "address": data.address,
                "updatedAt": data.updatedAt
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const choosenUser = await User.findByPk(req.params.id)

            if (!choosenUser) {
                throw {
                    name: "Not Found",
                    message: "User not found."
                }
            }

            await User.destroy({ where: { id: req.params.id } })

            res.status(200).json({
                message: `${choosenUser.email} success to delete.`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller