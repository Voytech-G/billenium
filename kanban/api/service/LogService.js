const appConfig = require('../config/app')

class LogService {
    /**
     * Put success message in console
     * 
     * @param {String} message 
     */
    static success(message) {
        // check if success messages are logged
        if (appConfig.logs.saveSuccessMessages === true) {
            // TODO write the log in txt file on the server
        }

        // check if app is in development mode (dont want to show messages in console in production mode)
        if (appConfig.development === false) {
            return
        }

        console.log(message)
    }

    /**
     * Put info message in console
     * 
     * @param {String} message 
     */
    static info(message) {
        if (appConfig.logs.saveInfoMessages === true) {
            // TODO write the log in txt file on the server
        }

        if (appConfig.development === false) {
            return
        }

        console.info(message)
    }

    /**
     * Put error message in console
     * 
     * @param {String} message 
     */
    static error(message) {
        if (appConfig.logs.saveErrorMessages === true) {
            // TODO write the log in txt file on the server
        }

        if (appConfig.development === false) {
            return
        }

        console.error(message)
    }
}

module.exports = LogService