const express = require('express')
require('dotenv').config()
const {dbConnection} = require('./database/config')

console.log(process.env)

const app = express()

dbConnection()

app.use(express.static('public'))

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))






app.listen(4000, () => {
    console.log(`Servidor corriendo en el puerto ${4000}`)
})