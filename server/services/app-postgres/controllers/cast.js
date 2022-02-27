const { Cast, Movie } = require('../models');

class Controller {
    static async createCast(req, res, next) {
        try {
            const { movieId, name, profilePict } = req.body
            const newCast = await Cast.create({ movieId, name, profilePict })

            res.status(200).json(newCast)
        } catch (err) {
            next(err)
        }
    }

    static async listCast(req, res, next) {
        try {
            const casts = await Cast.findAll({
                include: [
                    {
                        model: Movie,
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt']
                        }
                    }
                ]
            })

            res.status(200).json(casts)
        } catch (err) {
            next(err)
        }
    }

    static async findCast(req, res, next) {
        try {
            const { id } = req.params
            const cast = await Cast.findByPk(id)

            if (!cast) throw { name: "NOT_FOUND" }

            res.status(200).json(cast)
        } catch (err) {
            next(err)
        }
    }

    static async editCast(req, res, next) {
        try {
            const { id } = req.params
            const { movieId, name, profilePict } = req.body
            const editData = { movieId, name, profilePict }
            const cast = await Cast.findByPk(+id)

            if (!cast) throw { name: "NOT_FOUND" }

            const result = await Cast.update(editData, {
                where: { id },
                returning: true
            })

            res.status(200).json(result[1][0])
        } catch (err) {
            next(err)
        }
    }

    static async deleteCast(req, res, next) {
        try {
            const { id } = req.params
            const cast = await Cast.findByPk(+id)

            if (!cast) throw { name: "NOT_FOUND" }

            await Cast.destroy({ where: { id } })

            res.status(200).json({
                message: `${cast.name} success to delete.`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller