class ColumnValidator {
    /**
     * Validate get all columns response data
     * 
     * @param {Array} response 
     * @return void
     */
    static validateGetAllResponse(response) {
        // check if response is not array
        if (!Array.isArray(response)) {
            throw new Error('Invalid response')
        }

        return
    }
}

module.exports = ColumnValidator