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

            ColumnValidator.validateCreateResponse(column)

            callback({
                status: true,
                message: 'Successfully created a new column',
                payload: column,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to create a new column: ${exception.message}`,
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

            ColumnValidator.validateUpdateResponse(column)
    
            callback({
                status: true,
                message: 'Successfully updated the column',
                column: column,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to update the column: ${exception.message}`
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

            ColumnValidator.validateRemoveResponse(column)

            callback({
                status: true,
                message: `Successfully removed the column`,
                payload: column,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to remove the column: ${exception.message}`
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
                payload: column.populate('tasks'),
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to get one column: ${exception.message}`
            })

            return
        }
    }
}

module.exports = ColumnController