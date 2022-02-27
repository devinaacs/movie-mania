const { connect, getMongoConnection } = require('../config/mongoConnection');

const users = [
    {
        "id": 1,
        "username": "Gary Dauberman",
        "email": "gary@mail.com",
        "password": "$2a$08$K6FDHkQzapw239POcHSi6OlFrCyPKzlGLi5wdbSWg2pS8wR84U9j6",
        "role": "Admin",
        "phoneNumber": "81222444666",
        "address": "United States of America",
        "createdAt": "2022-02-11T08:29:49.850Z",
        "updatedAt": "2022-02-11T08:29:49.850Z"
    },
    {
        "id": 2,
        "username": "J. K. Rowling",
        "email": "jk@mail.com",
        "password": "$2a$08$5B7DX\/oWeqiNLrr5f8qIze.pcKeNdz9SryOJQYMDI.SHAh9DVKJTW",
        "role": "Admin",
        "phoneNumber": "81263847635",
        "address": "England",
        "createdAt": "2022-02-11T08:29:49.896Z",
        "updatedAt": "2022-02-11T08:29:49.896Z"
    },
    {
        "id": 3,
        "username": "Steven Spielberg",
        "email": "steven@mail.com",
        "password": "$2a$08$vm1Qi02bysftZvnr5PV5yeiPHi3vIVUe6x.FmmXQLkqjEWYgmbwn.",
        "role": "Admin",
        "phoneNumber": "81356754298",
        "address": "United States of America",
        "createdAt": "2022-02-11T08:29:49.943Z",
        "updatedAt": "2022-02-11T08:29:49.943Z"
    },
    {
        "id": 4,
        "username": "Jon Watts",
        "email": "jon@mail.com",
        "password": "$2a$08$WczR1ud6QhVkmk\/L0n3PeuGZJq\/gZGEQ.ZhaxBSumXOcZb6DAYPZ2",
        "role": "Admin",
        "phoneNumber": "81222444666",
        "address": "United States of America",
        "createdAt": "2022-02-11T08:29:49.989Z",
        "updatedAt": "2022-02-11T08:29:49.989Z"
    },
    {
        "id": 5,
        "username": "Joko Anwar",
        "email": "joko@mail.com",
        "password": "$2a$08$WIUbPTiNBKkKt0TuX2Ol9OFlngu5cKcLTp.m1JuNV0SXaB7aWoeOK",
        "role": "Admin",
        "phoneNumber": "81526736452",
        "address": "Indonesia",
        "createdAt": "2022-02-11T08:29:50.036Z",
        "updatedAt": "2022-02-11T08:29:50.036Z"
    },
    {
        "id": 6,
        "username": "Fede Alvarez",
        "email": "fede@mail.com",
        "password": "$2a$08$lU0yVfhLlME6ZW6C\/.rnIO6zZvh4YFUFQonCPyTg6ieh2PpGisS5O",
        "role": "Admin",
        "phoneNumber": "81253678998",
        "address": "Uruguay",
        "createdAt": "2022-02-11T08:29:50.087Z",
        "updatedAt": "2022-02-11T08:29:50.087Z"
    },
    {
        "id": 7,
        "username": "Yeon Sang-ho",
        "email": "yeon@mail.com",
        "password": "$2a$08$38uAUagXqqqNjQTitB\/1KO4ci3Jka9TnsHeaFZCVaH.CazSD9aZWS",
        "role": "Admin",
        "phoneNumber": "81625736453",
        "address": "South Korea",
        "createdAt": "2022-02-11T08:29:50.134Z",
        "updatedAt": "2022-02-11T08:29:50.134Z"
    },
    {
        "id": 8,
        "username": "Anthony McCarten",
        "email": "anthony@mail.com",
        "password": "$2a$08$oJe9bBrAoqQPrYZxFikJ0ubRE8BV83qkmGOw6LHBtz9RFuprVM4jW",
        "role": "Admin",
        "phoneNumber": "81652734896",
        "address": "New Zealand",
        "createdAt": "2022-02-11T08:29:50.183Z",
        "updatedAt": "2022-02-11T08:29:50.183Z"
    },
    {
        "id": 9,
        "username": "Damien Chazelle",
        "email": "damien@mail.com",
        "password": "$2a$08$MaRqVtNGnqKKZrtDRbib1eksKm7UcmkEhKEmEdPc2kwYTtBmRWlma",
        "role": "Admin",
        "phoneNumber": "81567243563",
        "address": "United State of America",
        "createdAt": "2022-02-11T08:29:50.231Z",
        "updatedAt": "2022-02-11T08:29:50.231Z"
    },
    {
        "id": 10,
        "username": "Phil Lord",
        "email": "phil@mail.com",
        "password": "$2a$08$h7vJEPeeyyIxJz08EVTp\/eLyZYY8fLsXsd66uoaq6DMrapcQqJMkO",
        "role": "Admin",
        "phoneNumber": "81928472622",
        "address": "United State of America",
        "createdAt": "2022-02-11T08:29:50.278Z",
        "updatedAt": "2022-02-11T08:29:50.278Z"
    },
    {
        "id": 11,
        "username": "Dennis Dugan",
        "email": "dennis@mail.com",
        "password": "$2a$08$Dow6Zmy6Mb7ISOqIZgVeW.ztBfGsxy2HYKkopEB2qSQhnRff58Pwi",
        "role": "Admin",
        "phoneNumber": "81562734253",
        "address": "United State of America",
        "createdAt": "2022-02-11T08:29:50.321Z",
        "updatedAt": "2022-02-11T08:29:50.321Z"
    },
    {
        "id": 12,
        "username": "Giddens Ko",
        "email": "giddens@mail.com",
        "password": "$2a$08$3IMxKDxWInIi3aFCeMf.E.lf2Q7D3F.xJijEw\/gc0638DvCziEBrO",
        "role": "Admin",
        "phoneNumber": "81652735439",
        "address": "Republic of China",
        "createdAt": "2022-02-11T08:29:50.365Z",
        "updatedAt": "2022-02-11T08:29:50.365Z"
    },
    {
        "id": 13,
        "username": "Will Gluck",
        "email": "will@mail.com",
        "password": "$2a$08$BVyQR23pLoLgsh9\/jMabaeO7U4tADqaSEsdFzbB7vE9VD2IeEAQ42",
        "role": "Admin",
        "phoneNumber": "81627354624",
        "address": "United State of America",
        "createdAt": "2022-02-11T08:29:50.411Z",
        "updatedAt": "2022-02-11T08:29:50.411Z"
    },
    {
        "id": 14,
        "username": "Joss Whedon",
        "email": "joss@mail.com",
        "password": "$2a$08$BRR3LKxxtsiahgMXITFaNuTRi0MwKkPCs8tSGfPcdN9BlFixXN9LW",
        "role": "Admin",
        "phoneNumber": "81726354625",
        "address": "United State of America",
        "createdAt": "2022-02-11T08:29:50.454Z",
        "updatedAt": "2022-02-11T08:29:50.454Z"
    },
    {
        "id": 15,
        "username": "Bruce Geller",
        "email": "bruce@mail.com",
        "password": "$2a$08$PKFMOeHPqexBQIHkUG76yeVy4keqQ5GzjKctDD6XuHr6fXJ5UWKdq",
        "role": "Admin",
        "phoneNumber": "81928365432",
        "address": "United State of America",
        "createdAt": "2022-02-11T08:29:50.498Z",
        "updatedAt": "2022-02-11T08:29:50.498Z"
    },
    {
        "id": 16,
        "username": "Simon McQuoid",
        "email": "simon@mail.com",
        "password": "$2a$08$zcuPna4VDchqdBBuDaFcbO6vWtlK0xBQ00EbSmumscsxWvRaPgra2",
        "role": "Admin",
        "phoneNumber": "81826345726",
        "address": "Autralia",
        "createdAt": "2022-02-11T08:29:50.541Z",
        "updatedAt": "2022-02-11T08:29:50.541Z"
    },
    {
        "id": 17,
        "username": "Hayao Miyazaki",
        "email": "hayao@mail.com",
        "password": "$2a$08$2m30FEn1EzORiAjwFzJQtuFl0mTqJPFk7qwZEo4xYEjVmT4C0COT.",
        "role": "Admin",
        "phoneNumber": "81721159876",
        "address": "Japan",
        "createdAt": "2022-02-11T08:29:50.583Z",
        "updatedAt": "2022-02-11T08:29:50.583Z"
    },
    {
        "id": 18,
        "username": "Pierre Boulle",
        "email": "pierre@mail.com",
        "password": "$2a$08$SKTHu.WvGR9WUXfVyl8zHOwy3BTW\/mq.ywNQmZJ69kbIdITwHKUPC",
        "role": "Admin",
        "phoneNumber": "81723389876",
        "address": "France",
        "createdAt": "2022-02-11T08:29:50.623Z",
        "updatedAt": "2022-02-11T08:29:50.623Z"
    }
]

connect()
    .then(async () => {
        const db = await getMongoConnection().collection('users')
        const result = await db.insertMany(users)
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
