const { ObjectId } = require('mongodb');
const { getMongoConnection } = require('../config/mongoConnection');
const { createHash } = require('../helpers/bcrypt');
class User {
    static user() {
        const db = getMongoConnection()
        return db.collection('users')
    }

    static async findAll() {
        return this.user().find().toArray()
    }

    static async findByPk(id) {
        try {
            const findUser = await this.user().findOne({ '_id': ObjectId(id) })

            return findUser
        } catch (err) {
            console.log(err)
        }
    }

    static async findByPkWithoutObjectId(id) {
        try {
            const findUser = await this.user().findOne({ '_id': id })

            return findUser
        } catch (err) {
            console.log(err)
        }
    }

    static async create(data) {
        try {
            const newUser = await this.user().insertOne({
                'username': data.username,
                'email': data.email,
                'password': createHash(data.password),
                'role': "Admin",
                'phoneNumber': data.phoneNumber,
                'address': data.address
            })

            return newUser
        } catch (err) {
            console.log(err)
        }
    }

    static async destroy(id) {
        return this.user().deleteOne({ '_id': ObjectId(id) })
    }
}

module.exports = User