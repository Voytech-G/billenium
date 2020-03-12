const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const appConfig = require("./config/app");
const databaseConfig = require("./config/database");
const connectToDatabase = require("./database/connection");
connectToDatabase(databaseConfig);

const getBoard = require("./functions/getBoard");
const handleCreateNote = require("./events/note/create");
const handleUpdateNote = require("./events/note/update");
const handleDeleteNote = require("./events/note/delete");

const handleConnectionEstablished = async socket => {
  console.log(`socket of id: ${socket.id} has just connected`);

  socket.emit("board", await getBoard());

  socket.on("create-note", handleCreateNote);
  socket.on("delete-note", handleDeleteNote);
  socket.on("update-note", handleUpdateNote);
};

io.on("connection", handleConnectionEstablished);

const PORT = process.env.PORT || appConfig.port;
const handleServerListening = () => {
  console.log(`Server is listening on port: ${PORT}`);
};

server.listen(PORT, handleServerListening);
