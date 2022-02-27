const { Genre, Cast, Movie, sequelize } = require('../models');

class Controller {
    static async createMovie(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const {
                title,
                synopsis,
                trailerUrl,
                imgUrl,
                rating,
                genreId,
                year,
                userMongoId,
                name1,
                profilePict1,
                name2,
                profilePict2,
                name3,
                profilePict3
            } = req.body

            const newMovie = await Movie.create({
                'title': title,
                'synopsis': synopsis,
                'trailerUrl': trailerUrl,
                'imgUrl': imgUrl,
                'rating': rating,
                'genreId': genreId,
                'year': year,
                'userMongoId': userMongoId
            },
                {
                    transaction: t
                })

            const newCast1 = await Cast.create({
                movieId: newMovie.id,
                name: name1,
                profilePict: profilePict1
            },
                {
                    transaction: t
                })

            const newCast2 = await Cast.create({
                movieId: newMovie.id,
                name: name2,
                profilePict: profilePict2
            },
                {
                    transaction: t
                })

            const newCast3 = await Cast.create({
                movieId: newMovie.id,
                name: name3,
                profilePict: profilePict3
            },
                {
                    transaction: t
                })

            await t.commit()

            const addedMovie = await Movie.findOne({
                where: { 'id': newMovie.id }, include: [
                    {
                        model: Genre,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Cast,
                        attributes: ['id', 'movieId', 'name', 'profilePict']
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            })

            res.status(200).json(addedMovie)
        } catch (err) {
            await t.rollback()
            next(err)
        }
    }

    static async listMovie(req, res, next) {
        try {
            const listMovie = await Movie.findAll({
                include: [
                    {
                        model: Genre,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Cast,
                        attributes: ['id', 'movieId', 'name', 'profilePict']
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [['title', 'ASC']]
            })

            res.status(200).json(listMovie)
        } catch (err) {
            next(err)
        }
    }

    static async findMovie(req, res, next) {
        try {
            const { id } = req.params
            const movie = await Movie.findOne({
                where: { 'id': id }, include: [
                    {
                        model: Genre,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Cast,
                        attributes: ['id', 'movieId', 'name', 'profilePict']
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            })

            if (!movie) throw { name: "NOT_FOUND" }

            res.status(200).json(movie)
        } catch (err) {
            next(err)
        }
    }

    static async deleteMovie(req, res, next) {
        try {
            const { id } = req.params
            const movie = await Movie.findByPk(id)

            if (!movie) throw { name: "NOT_FOUND" }

            await Movie.destroy({ where: { 'id': id } })
            await Cast.destroy({ where: { 'movieId': id } })

            res.status(200).json({
                message: `${movie.title} success to delete.`
            })
        } catch (err) {
            next(err)
        }
    }

    static async editMovie(req, res, next) {
        try {
            const { id } = req.params
            const {
                title,
                synopsis,
                trailerUrl,
                imgUrl,
                rating,
                genreId,
                year,
                name1,
                profilePict1,
                name2,
                profilePict2,
                name3,
                profilePict3
            } = req.body

            const movieData = { title, synopsis, trailerUrl, imgUrl, rating, genreId, year }

            const movie = await Movie.findByPk(+id)

            if (!movie) throw { name: "NOT_FOUND" }

            const result = await Movie.update(movieData, {
                where: { 'id': id },
                returning: true
            })

            const casts = await Cast.findAll({ where: { movieId: result[1][0].id } })

            const cast1 = await Cast.update({
                name: name1,
                profilePict: profilePict1
            }, {
                where: { id: casts[0].id },
                returning: true
            })

            const cast2 = await Cast.update({
                name: name2,
                profilePict: profilePict2
            }, {
                where: { id: casts[1].id },
                returning: true
            })

            const cast3 = await Cast.update({
                name: name3,
                profilePict: profilePict3
            }, {
                where: { id: casts[2].id },
                returning: true
            })

            const updatedMovie = await Movie.findOne({
                where: { 'id': id }, include: [
                    {
                        model: Genre,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Cast,
                        attributes: ['id', 'movieId', 'name', 'profilePict']
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            res.status(200).json(updatedMovie)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller