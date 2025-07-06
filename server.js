const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoDb = require('./data/database')

app.use('/', require('./routes'))

mongoDb.initDb((error) => {
    if (error){
        console.log(error)
    } else {
        app.listen(port, () => {
            console.log(`DB is running and server is listening on port ${port}`)
        })

    }
})
