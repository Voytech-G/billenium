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
     * Delete a column
     * 
     * @param {Object} payload 
     * @param {Function} callback
     * @return {void} 
     */
    static async delete(payload, callback) {
        try {
            ColumnValidator.validateDeleteRequest(payload)

            const column = await ColumnService.deleteColumn(payload)

            ColumnValidator.validateDeleteResponse(column)

            callback({
                status: true,
                message: `Successfully deleted the column`,
                payload: column,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to delete the column: ${exception.message}`
            })

            return
        }
    }
}

module.exports = ColumnController