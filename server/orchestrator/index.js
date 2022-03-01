const { ApolloServer, gql } = require('apollo-server');
const Redis = require('ioredis');
const redis = new Redis({
    port: 12351, // Redis port
    host: "redis-12351.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
    username: "devinaacs",
    password: "Shinichikudo.7",
});
const axios = require('axios');


const typeDefs = gql`
    type Movie {
        id: ID
        title: String
        synopsis: String
        trailerUrl: String
        imgUrl: String
        rating: Int
        genreId: ID
        authorId: Int
        year: Int
        userMongoId: String 
        Genre: Genre
        Casts: [Cast]
    }

    type Genre {
        id: ID
        name: String
    }

    type User {
        _id: ID 
        username: String
        email: String 
        role: String
        phoneNumber: String
        address: String
    }

    type Cast {
        id: ID
        movieId: ID
        name: String
        profilePict: String
    }

    type deletedMsg {
        message: String
    }

    input newMovie {
        title: String
        synopsis: String
        trailerUrl: String
        imgUrl: String
        rating: Int
        genreId: ID
        year: Int
        userMongoId: String
        name1: String
        profilePict1: String
        name2: String
        profilePict2: String
        name3: String
        profilePict3: String
    }

    input newUser {
        username: String
        email: String
        password: String
        phoneNumber: String
        address: String
    }

    type Query {
        getMovies: [Movie] 
        getMovie(id: ID!): Movie 
        getUsers: [User]
        getUser(id: ID!): User

    }

    type Mutation {
        postMovie( data: newMovie ): Movie
        editMovie( id: ID!, data: newMovie ): Movie
        deleteMovie( id: ID! ): deletedMsg
        postUser( data: newUser ): User
        deleteUser( id: ID! ): deletedMsg
    }
`

const heroku_pg = 'https://movie-mania-be-pg.herokuapp.com/pub/movies'
const heroku_mo = 'https://movie-mania-be-mo.herokuapp.com/users'

const resolvers = {
    Query: {
        async getMovies() {
            try {
                const moviesCache = await redis.get('movies')

                if (moviesCache) {
                    return JSON.parse(moviesCache)
                } else {
                    const movies = await axios({
                        method: 'GET',
                        url: `${heroku_pg}`
                    })
                    await redis.set('movies', JSON.stringify(movies.data))
                    return movies.data
                }
            } catch (err) {
                console.log(err.response.data.message)
                throw err.response.data.message
            }
        },

        async getMovie(_, args) {
            try {
                const movie = await axios({
                    method: 'GET',
                    url: `${heroku_pg}/${args.id}`
                })
                return movie.data
            } catch (err) {
                console.log(err.response.data.message)
                throw err.response.data.message
            }
        },

        async getUsers() {
            try {
                const users = await axios({
                    method: 'GET',
                    url: `${heroku_mo}`
                })
                return users.data
            } catch (err) {
                console.log(err.response.data.message)
                throw err.response.data.message
            }
        },

        async getUser(_, args) {
            try {
                const user = await axios({
                    method: 'GET',
                    url: `${heroku_mo}/${args.id}`
                })
                return user.data
            } catch (err) {
                console.log(err.response.data.message)
                throw err.response.data.message
            }
        },
    },

    Mutation: {
        async postMovie(_, args) {
            try {
                const newMovie = await axios({
                    method: 'POST',
                    url: `${heroku_pg}`,
                    data: args.data
                })
                await redis.del('movies')
                return newMovie.data
            } catch (err) {
                console.log(err.response.data.message)
                throw err.response.data.message
            }
        },

        async editMovie(_, args) {
            try {
                const updateMovie = await axios({
                    method: 'PUT',
                    url: `${heroku_pg}/${args.id}`,
                    data: args.data
                })
                await redis.del('movies')
                return updateMovie.data
            } catch (err) {
                console.log(err.response.data.message)
                throw err.response.data.message
            }
        },

        async deleteMovie(_, args) {
            try {
                const destroyMovie = await axios({
                    method: 'DELETE',
                    url: `${heroku_pg}/${args.id}`,
                })
                await redis.del('movies')
                return destroyMovie.data
            } catch (err) {
                console.log(err.response.data.message)
                throw err.response.data.message
            }
        },

        async postUser(_, args) {
            try {
                const newUser = await axios({
                    method: 'POST',
                    url: `${heroku_mo}`,
                    data: args.data
                })
                return newUser.data
            } catch (err) {
                console.log(err)
            }
        },

        async deleteUser(_, args) {
            try {
                const destroyUser = await axios({
                    method: 'DELETE',
                    url: `${heroku_mo}/${args.id}`,
                })
                return destroyUser.data
            } catch (err) {
                console.log(err)
            }
        },
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});