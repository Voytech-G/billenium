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

io.use((socket, next) => {
  // method run every time before someone connects
  
  next()
})
.on('connection', async socket => {
  ConnectionsHandler.setupConnection(socket)
})

const PORT = process.env.PORT || appConfig.port
server.listen(PORT, () => {
  ServerHandler.handleListening(PORT)
})
