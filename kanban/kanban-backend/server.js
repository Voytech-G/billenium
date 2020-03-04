const express = require('express')
const app = express()
const http = require('http')
const socketIo = require('socket.io')
const server = http.createServer(app)
const io = socketIo(server)

const mongoose = require('mongoose');

const DB_USER = 'kanban-admin',
    DB_PASSWORD = 'kinethicc69';

let noteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: { type: String, required: true },
});

let Note = mongoose.model('Note', noteSchema);

const connectToDatabase = () => {
    mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds147946.mlab.com:47946/kanban-variant`, { useNewUrlParser: true });

    let db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', () => {
        console.log(`Created a connection to the database!`);
    });
}

connectToDatabase()

const handleConnectionEstablished = socket => {
    console.log(`socket of id: ${socket.id} has just connected`)

    socket.on('client-message', payload => {
        let message = payload.value

        console.log(`message from client: ${message}`)
    })

    socket.on('new-note', payload => {
        let content = payload.id

        let newNote = new Note({
            _id: new mongoose.Types.ObjectId(),
            content
        })

        newNote.save(error => {
                if (error) {
                    console.log(`An error occured: ${error}`)

                    return
                }

                console.log('Successfully added a new Note')
            })
            // console.log(`creating new note, content: ${content}`)

        //mongoose save note to database here
    })
}

io.on('connection', handleConnectionEstablished)

const PORT = process.env.PORT || 4000

const handleServerListening = () => {
    console.log(`Server is listening on port: ${PORT}`)
}

server.listen(PORT, handleServerListening)