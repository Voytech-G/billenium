const ValidatorAbstract = require('../ValidatorAbstract')

class ColumnValidator extends ValidatorAbstract {
    /**
     * Validate create column request data
     * 
     * @param {Object} request 
     * @return {void}
     */
    static validateCreateRequest(request) {
        if (request.name == null) {
            throw new Error('Column name is required')
        }

        if (request.board_index == null) {
            throw new Error('Column board index is required')
        }

        if (typeof request.board_index != 'number') {
            throw new Error('Column board index has to be a number')
        }

        if (request.max_tasks == null) {
            throw new Error('Column max tasks number is required')
        }

        return
    }

    /**
     * Validate update column request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateUpdateRequest(payload) {
        if (payload.column_id == null) {
            throw new Error('Column ID is required')
        }

        if (payload.name == null) {
            throw new Error('Column name is required')
        }

        if (payload.board_index == null) {
            throw new Error('Column board index is required')
        }

        if (payload.max_tasks == null) {
            throw new Error('Column max tasks number is required')
        }

        return
    }

    /**
     * Check if given column ID is valid mongoose object ID
     * 
     * @param {string} columnId
     * @return {void}
     */
    static checkColumnObjectIDValid(columnId) {
        this.checkObjectIDValid(columnId, 'column')

        return
    }
       
    /**
     * Validate remove request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateRemoveRequest(payload) {
        if (payload.column_id == null) {
            throw new Error('Column ID is required')
        } 
        
        return
    }

    /**
     * Validate get one request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateGetOneRequest(payload) {
        this.checkColumnObjectIDValid(payload.column_id)

        return
    }
}

module.exports = ColumnValidator