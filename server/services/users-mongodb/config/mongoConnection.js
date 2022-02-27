const { MongoClient } = require('mongodb')

const uri = 'mongodb+srv://devinaacs:Shinichikudo7@hacktiv8-movie-mania.fyaiu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri)

let mongoConnection

const connect = async () => {
    try {
        const connection = await client.connect()
        db = await connection.db('p3-ch2-movies')
        mongoConnection = db
    } catch (err) {
        throw err
    }
}

function getMongoConnection() {
    return mongoConnection
}

module.exports = { connect, getMongoConnection } 