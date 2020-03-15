const mongoose = require('mongoose')
const databaseConfig = require('../config/database')

class DatabaseService {
    connection = undefined;
    config = undefined;

    /**
     * DatabaseConnection constructor
     */
    constructor() {
        this.config = databaseConfig
    }

    /**
     * Create database connection
     * 
     * @return bool
     */
    async connectionOpen() {
        const DB_USERNAME = this.config.connection.username
        const DB_PASSWORD = this.config.connection.password
        const DB_OPTIONS = this.config.connection.options

        try {
            await mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@ds147946.mlab.com:47946/kanban-variant`, DB_OPTIONS)

            this.connection = mongoose.connection
        
            this.connection.on('error', error => {
                this.handleError(error)
            });
            
            this.connection.once('open', () => {
                this.handleConnectionOpened()
            })

            return true
        } catch (exception) {
            this.handleError(exception)
            
            return false
        }
    }

    /**
     * Handle database connection created
     * 
     * @return void 
     */
    handleConnectionOpened() {
        console.log('Created a connection to the database!')

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
            console.error('A database error occured')

            return
        }

        console.error(`A database error occured: ${error}`)
        return
    }
}

module.exports = new DatabaseService()