const Connection = require('../entity/Connection')
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
     * @return {void} 
     */
    addConnection(socket) {
        let connection = new Connection(socket)

        this.connections.push(connection)

        return
    }

    /**
     * Method run every incoming event
     * 
     * @param {Object} payload // data sent from client in event 
     * @param {Function} next // next run method, in this case given event handler
     */
    handleIncomingEvent(payload, next) {
        LogService.info('Incoming event')

        // calling default event handler to which this request was going to
        return next()
    }

    /**
     * Show all connected sockets
     * 
     * @return {void}
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