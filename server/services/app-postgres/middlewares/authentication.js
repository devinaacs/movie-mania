const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

const authentication = async (req, res, next) => {
    try {

        const { access_token } = req.headers

        const payload = verifyToken(access_token)

        const validatedUser = await User.findOne({ where: { email: payload.email } })

        if (!validatedUser) {
            throw { name: "UNAUTHORIZED" }
        }

        req.currentUser = {
            id: validatedUser.id,
            email: validatedUser.email,
            role: validatedUser.role
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication