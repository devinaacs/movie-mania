const Redis = require('ioredis');
const redis = new Redis()
const axios = require('axios');

class Controller {
    static async postMovie(req, res, next) {
        try {
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, year, userMongoId, name1, profilePict1, name2, profilePict2, name3, profilePict3 } = req.body

            const data = { title, synopsis, trailerUrl, imgUrl, rating, genreId, year, userMongoId, name1, profilePict1, name2, profilePict2, name3, profilePict3 }

            const { data: movie } = await axios({
                method: 'POST',
                url: 'http://localhost:4002/pub/movies',
                data: data
            })
            await redis.del('movies')
            res.status(200).json(movie)
        } catch (err) {
            next(err)
        }
    }
    static async getAllMovies(req, res, next) {
        try {
            const moviesCache = await redis.get('movies')

            if (moviesCache) {
                res.status(200).json(JSON.parse(moviesCache))
            } else {
                const { data: movies } = await axios({
                    method: 'GET',
                    url: 'http://localhost:4002/pub/movies'
                })
                for (let i = 0; i < movies.length; i++) {
                    const { data: user } = await axios({
                        method: 'GET',
                        url: `http://localhost:4001/users/${movies[i].userMongoId}`
                    })
                    movies[i].User = {}
                    movies[i].User = user
                }

                await redis.set('movies', JSON.stringify(movies))
                res.status(200).json(movies)
            }
        } catch (err) {
            next(err)
        }
    }

    static async findMovieById(req, res, next) {
        try {
            const { id } = req.params

            const { data: movie } = await axios({
                method: 'GET',
                url: `http://localhost:4002/pub/movies/${id}`
            })

            const { data: user } = await axios({
                method: 'GET',
                url: `http://localhost:4001/users/${movie.userMongoId}`
            })

            res.status(200).json({
                ...movie,
                User: user
            })
        } catch (err) {
            next(err)
        }
    }

    static async editMovie(req, res, next) {
        try {
            const { id } = req.params
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, year, name1, profilePict1, name2, profilePict2, name3, profilePict3 } = req.body
            const data = { title, synopsis, trailerUrl, imgUrl, rating, genreId, year, name1, profilePict1, name2, profilePict2, name3, profilePict3 }

            const { data: movies } = await axios({
                method: 'PUT',
                url: `http://localhost:4002/pub/movies/${id}`,
                data: data
            })

            await redis.del('movies')

            res.status(200).json(movies)
        } catch (err) {
            next(err)
        }
    }

    static async deleteMovie(req, res, next) {
        try {
            const { id } = req.params

            const { data: movies } = await axios({
                method: 'DELETE',
                url: `http://localhost:4002/pub/movies/${id}`
            })

            await redis.del('movies')

            res.status(200).json(movies)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller