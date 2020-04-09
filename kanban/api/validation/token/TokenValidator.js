class TokenValidator {
    /**
     * Validate authentication token format
     * 
     * @param {String} token
     * @return {void} 
     */
    static validateToken(token) {
        if (token == null || token == "") {
            throw new Error('Authentication token is required')
        }

        return
    }
}

module.exports = TokenValidator