const Connection = require('../Entity/Connection')
const LogService = require('../service/LogService')

class ConnectionsService {
    /**
     * ConnectionsService constructor
     */
    constructor() {
        // list of active connections
        this.connections = []
    }
    
    /**
     * Add new connection
     * 
     * @param {Object} socket
     * @return void 
     */
    addConnection(socket) {
        let connection = new Connection(socket)

        this.connections.push(connection)

        return
    }

    /**
     * Show all connected sockets
     * 
     * @return void
     */
    showConnections() {
        LogService.info('Displaying list of connections')

        for (let connection of this.connections) {
            connection.show()
        }

        return
    }
}

module.exports = ConnectionsService