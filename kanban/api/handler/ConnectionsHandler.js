const NoteController = require('../controller/NoteController')
const ConnectionsService = require('../service/ConnectionsService') 
const BoardController = require('../controller/BoardController')

class ConnectionsHandler {
    connectionsService = undefined

    /**
     * ConnectionsHandler constructor
     */
    constructor() {
        this.connectionsService = new ConnectionsService()
    }

    /**
     * Setup a socket.io connection, register events
     * 
     * @param {Object} socket
     * @return void 
     */
    async setupConnection(socket) {
        console.log(`Socket of ID: ${socket.id} has just connected`);

        this.addConnection(socket)

        socket.on('get-board', callback => {
            BoardController.getBoard(callback)
        })
        
        socket.on('create-note', (payload, callback) => {
            NoteController.create(payload, callback)

            return
        })

        socket.on('update-note', (payload, callback) => {
            NoteController.update(payload, callback)
        
            return
        })

        socket.on('delete-note', (payload, callback) => {
            NoteController.delete(payload, callback)
        
            return
        })
    }

    /**
     * Register new connection
     * 
     * @param {Object} socket 
     * @return void
     */
    addConnection(socket) {
        // add new socket connection
        this.connectionsService.addConnection(socket)

        this.connectionsService.showConnections()

        return
    }
}

module.exports = new ConnectionsHandler()