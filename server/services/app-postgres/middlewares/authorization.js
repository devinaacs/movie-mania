const { User, Movie } = require('../models');

const authorization = async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.id)

        if (!movie) {
            throw { name: "Not Found" }
        }

        const user = await User.findByPk(req.currentUser.id);

        if (user.role === 'Admin') {
            next()
        } else {
            throw { name: "FORBIDDEN" }
        }
    } catch (err) {
        next(err)
    }
}


module.exports = { authorization }