const mongoose = require('mongoose')
const databaseConfig = require('../config/database')
const appConfig = require('../config/app')
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
     * Return production or development database connection config depending on app development state
     * 
     * @return {Object}
     */
    getDatabaseConnectionConfig() {
        try {
            const development = appConfig.development
    
            return development === true ? databaseConfig.developmentDatabaseConnection : databaseConfig.productionDatabaseConnection
        } catch (exception) {
            throw new Error(`Failed to get database connection config: ${exception.message}`)
        }
    }

    /**
     * Create database connection
     * 
     * @return {void}
     */
    async connectionOpen() {
        try {
            // get database connection config depending on development state
            const config = this.getDatabaseConnectionConfig()

            const DB_CONTAINER_NAME = config.databaseContainerName
            const DB_PORT = config.databasePort
            const DB_NAME = config.databaseName
            const DB_USERNAME = config.username
            const DB_PASSWORD = config.password
            const DB_OPTIONS = config.options

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
     * @return {void} 
     */
    handleConnectionOpened() {
        LogService.success('Created a connection to the database!')

        return
    }

    /**
     * Handle database connection error
     * 
     * @param {string} error
     * @return {void} 
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