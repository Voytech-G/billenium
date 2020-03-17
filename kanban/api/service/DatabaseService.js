const mongoose = require('mongoose')
const databaseConfig = require('../config/database')
const LogService = require('../service/LogService')

class DatabaseService {
    /**
     * DatabaseConnection constructor
     */
    constructor() {
        this.connection = undefined
        this.config = undefined
        this.config = databaseConfig
    }

    /**
     * Create database connection
     * 
     * @return void
     */
    async connectionOpen() {
        const DB_CONTAINER_NAME = this.config.connection.databaseContainerName
        const DB_PORT = this.config.connection.databasePort
        const DB_NAME = this.config.connection.databaseName
        const DB_USERNAME = this.config.connection.username
        const DB_PASSWORD = this.config.connection.password
        const DB_OPTIONS = this.config.connection.options

        try {
            await mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_CONTAINER_NAME}.mlab.com:${DB_PORT}/${DB_NAME}`, DB_OPTIONS)

            this.connection = mongoose.connection
        
            this.connection.on('error', error => {
                this.handleError(error)
            });
            
            this.connection.once('open', () => {
                this.handleConnectionOpened()
            })

            return
        } catch (exception) {
            this.handleError(exception)
            
            process.exit()
        }
    }

    /**
     * Handle database connection created
     * 
     * @return void 
     */
    handleConnectionOpened() {
        LogService.success('Created a connection to the database!')

        return
    }

    /**
     * Handle database connection error
     * 
     * @param {string} error
     * @return void 
     */
    handleError(error) {
        // if error is not string or is undefined
        if (error == null || typeof error != 'string') {
            LogService.error('A database error occured')

            process.exit(0)
        }

        LogService.error(`A database error occured: ${error}`)
        process.exit(0)
    }
}

module.exports = new DatabaseService()