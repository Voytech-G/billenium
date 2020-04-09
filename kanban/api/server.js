const express = require('express')
const app = express()
const http = require('http')
const socketIo = require('socket.io')
const server = http.createServer(app)
const io = socketIo(server)
const appConfig = require('./config/app')
const DatabaseService = require('./service/DatabaseService')
const ConnectionsHandler = require('./handler/ConnectionsHandler')
const ServerHandler = require('./handler/ServerHandler')

DatabaseService.connectionOpen()

// method called once every time new socket connection is established
io.use(async (socket, next) => {
  next()
})
.on('connection', async socket => {
  ConnectionsHandler.setupConnection(socket)
})

const PORT = appConfig.port
server.listen(PORT, () => {
  ServerHandler.handleListening(PORT)
})
