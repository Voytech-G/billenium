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

        return
    }

    /**
     * Validate create column response data
     * 
     * @param {Object} column 
     * @return {void}
     */
    static validateCreateResponse(column) {
        if (typeof column != 'object') {
            throw new Error('Create column error occured')
        }

        return
    }
    
    /**
     * Validate get all columns response data
     * 
     * @param {Array} response 
     * @return {void}
     */
    static validateGetAllResponse(response) {
        // check if response is not array
        if (!Array.isArray(response)) {
            throw new Error('Invalid response')
        }

        return
    }

    static validateFindByIdResponse(response) {
        if (response == null) {
            throw new Error('Failed assigning created task to the selected column')
        }

        if (response.length > 1) {
            throw new Error('Found more than 1 column of this ID')
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
}

module.exports = ColumnValidator