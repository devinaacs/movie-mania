import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: 'https://movie-mania-be-apollo.herokuapp.com/',
    cache: new InMemoryCache
})

export default client