const LogService = require('../service/LogService')

class Connection {
    /**
     * Connection constructor
     * 
     * @param {Object} socket 
     */
    constructor(socket) {
        this.id = socket.id
    }

    /**
     * Display data about the connection
     * 
     * @return {void}
     */
    show() {
        LogService.info(`Socket.io connection, ID: ${this.id}`)

        return
    }
}

module.exports = Connection