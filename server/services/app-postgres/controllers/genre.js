const { Genre } = require('../models');

class Controller {
    static async createGenre(req, res, next) {
        try {
            const { name } = req.body
            const newGenre = await Genre.create({ name })

            res.status(200).json(newGenre)
        } catch (err) {
            next(err)
        }
    }

    static async listGenre(req, res, next) {
        try {
            const genres = await Genre.findAll()

            res.status(200).json(genres)
        } catch (err) {
            next(err)
        }
    }

    static async findGenre(req, res, next) {
        try {
            const { id } = req.params
            const genre = await Genre.findByPk(id)

            if (!genre) throw { name: "NOT_FOUND" }

            res.status(200).json(genre)
        } catch (err) {
            next(err)
        }
    }

    static async deleteGenre(req, res, next) {
        try {
            const { id } = req.params
            const genre = await Genre.findByPk(+id)

            if (!genre) throw { name: "NOT_FOUND" }

            await Genre.destroy({ where: { id } })

            res.status(200).json({
                message: `${genre.name} success to delete.`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller