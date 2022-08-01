const http = require('http')
const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

global.Promise = Promise
let interval
var isPause = false;
const port = 3112


const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
})



app.use(morgan('dev'))
app.use(bodyParse.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    res.json({ msg: 'Hellow world' })
})

/**
 * @action program
 */

io.on('connection', require('./socket'))

server.listen(port, () => {
    console.log(`Server is running on Port: ${port}`)
})