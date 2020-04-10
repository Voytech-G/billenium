const ColumnService = require('../service/ColumnService')
const ColumnValidator = require('../validation/column/ColumnValidator')

class ColumnController {
    /**
     * Create a new column
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async create(payload, callback) {
        try {
            ColumnValidator.validateCreateRequest(payload)

            const column = await ColumnService.createColumn(payload)

            callback({
                status: true,
                payload: column,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message,
            })

            return
        }
    }

    /**
     * Update column
     * 
     * @param {Object} payload 
     * @param {Function} callback
     * @return {void} 
     */
    static async update(payload, callback) {
        try {
            ColumnValidator.validateUpdateRequest(payload)
    
            const column = await ColumnService.updateColumn(payload)
    
            callback({
                status: true,
                payload: column,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message
            })

            return
        }
    }
    
    /**
     * Remove a column
     * 
     * @param {Object} payload 
     * @param {Function} callback
     * @return {void} 
     */
    static async remove(payload, callback) {
        try {
            ColumnValidator.validateRemoveRequest(payload)

            const column = await ColumnService.removeColumn(payload)

            callback({
                status: true,
                payload: column,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message
            })

            return
        }
    }

    /**
     * Get data of one column
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     */
    static async getOne(payload, callback) {
        try {
            ColumnValidator.validateGetOneRequest(payload)
    
            const column = await ColumnService.getOne(payload)
    
            callback({
                status: true,
                payload: column,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message
            })

            return
        }
    }
}

module.exports = ColumnController