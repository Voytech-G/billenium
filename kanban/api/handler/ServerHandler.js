const LogService = require('../service/LogService')

class ServerHandler {
    /**
     * Handle server started listening
     * 
     * @param {String} PORT 
     * @return void
     */
    static handleListening(PORT) {
        LogService.success(`Server is listening at port: ${PORT}`)

        return
    }
}

module.exports = ServerHandler