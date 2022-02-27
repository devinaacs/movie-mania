import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
    query GetMovies {
        getMovies {
            id
            title
            synopsis
            trailerUrl
            imgUrl
            rating
            genreId
            authorId
            year
            userMongoId
            Genre {
                id
                name
            }
            Casts {
                id
                movieId
                name
                profilePict
            }
        }
    }
`


export const GET_MOVIE = gql` 
    query GetMovie($getMovieId: ID!) {
        getMovie(id: $getMovieId) {
            id
            title
            synopsis
            trailerUrl
            imgUrl
            rating
            genreId
            authorId
            year
            userMongoId
            Genre {
                id
                name
            }
            Casts {
                id
                movieId
                name
                profilePict
            }
        }
    }
`