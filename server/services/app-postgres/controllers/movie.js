const { User, Genre, Movie, Cast, sequelize } = require('../models/index');

class Controller {
    static async createMovie(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, year, name1, profilePict1, name2, profilePict2, name3, profilePict3 } = req.body
            console.log('0, -----')
            console.log({ title, synopsis, trailerUrl, imgUrl, rating, genreId, year, name1, profilePict1, name2, profilePict2, name3, profilePict3 })
            const newMovie = await Movie.create({
                'title': title,
                'synopsis': synopsis,
                'trailerUrl': trailerUrl,
                'imgUrl': imgUrl,
                'rating': rating,
                'genreId': genreId,
                'authorId': req.currentUser.id,
                'year': year
            },
                {
                    transaction: t
                })
            console.log('1, -----')
            const newCast1 = await Cast.create({
                movieId: newMovie.id,
                name: name1,
                profilePict: profilePict1
            },
                {
                    transaction: t
                })
            console.log('2, -----')

            const newCast2 = await Cast.create({
                movieId: newMovie.id,
                name: name2,
                profilePict: profilePict2
            },
                {
                    transaction: t
                })
            console.log('3, -----')

            const newCast3 = await Cast.create({
                movieId: newMovie.id,
                name: name3,
                profilePict: profilePict3
            },
                {
                    transaction: t
                })

            await t.commit()
            res.status(200).json(newMovie)
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
                        model: User,
                        attributes: ['username', 'email']
                    },
                    {
                        model: Genre,
                        attributes: ['name']
                    },
                    {
                        model: Cast,
                        attributes: ['name', 'profilePict']
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
                        model: User,
                        attributes: ['username', 'email']
                    },
                    {
                        model: Genre,
                        attributes: ['name']
                    },
                    {
                        model: Cast,
                        attributes: ['name', 'profilePict']
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [['title', 'ASC']]
            })
            if (!movie) throw { name: "NOT_FOUND" }

            res.status(200).json(movie)
        } catch (err) {
            next(err)
        }
    }

    static async editMovie(req, res, next) {
        try {
            const { id } = req.params
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, year, name1, profilePict1, name2, profilePict2, name3, profilePict3 } = req.body
            const editData = { title, synopsis, trailerUrl, imgUrl, rating, genreId, year, name1, profilePict1, name2, profilePict2, name3, profilePict3 }

            const choosenMovie = await Movie.findByPk(+id)

            if (!choosenMovie) {
                throw { name: "NOT_FOUND" }
            }

            const result = await Movie.update(editData, {
                where: { id },
                returning: true
            })

            res.status(200).json(result[1][0])
        } catch (err) {
            next(err)
        }
    }

    static async deleteMovie(req, res, next) {
        try {
            const { id } = req.params
            const movie = await Movie.findByPk(id)

            if (!movie) throw { name: "NOT_FOUND" }

            await Movie.destroy({ where: { id } })

            res.status(200).json({
                message: `${movie.title} success to delete.`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller