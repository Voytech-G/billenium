class TokenValidator {
    /**
     * Validate authentication token format
     * 
     * @param {String} token
     * @return {void} 
     */
    static validateToken(token) {
        try {
            if (token == null || token == "") {
                throw new Error('Authentication token is required')
            }

            return
        } catch (exception) {
            throw new Error(`Token validation failed: ${exception.message}`)
        }
    }
}

module.exports = TokenValidator