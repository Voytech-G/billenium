const express = require('express')
const app = express()
const http = require('http')
const socketIo = require('socket.io')
const server = http.createServer(app)
const io = socketIo(server)
const config = require('./database/config')
const connectToDatabase = require('./database/connection.js')
connectToDatabase(config)

const handleAddNote = require('./events/note/add.js')
const handleUpdateNote = require('./events/note/update.js')
const handleDeleteNote = require('./events/note/delete.js')

const handleConnectionEstablished = socket => {
    console.log(`socket of id: ${socket.id} has just connected`)

    socket.on('add-note', handleAddNote)

    socket.on('delete-note', handleDeleteNote)

    socket.on('update-note', handleUpdateNote);
}

io.on('connection', handleConnectionEstablished)

const PORT = process.env.PORT || 4000

const handleServerListening = () => {
    console.log(`Server is listening on port: ${PORT}`)
}

server.listen(PORT, handleServerListening)