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

    update(payload) {
        console.log(payload)
    }

    delete(payload) {
        console.log(payload)
    }
}

module.exports = ColumnController