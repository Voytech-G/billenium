class TokenValidator {
    /**
     * Validate contents of the object retrieved from encoded JWT token
     * 
     * @param {Object} tokenData 
     * @return {void}
     */
    static validateDecodedData(tokenData) {
        if (tokenData.username == null) {
            throw new Error('Username not found in decoded token data')
        }

        if (tokenData.user_type == null) {
            throw new Error('User type not found in decoded token data')
        }

        return
    }
}

module.exports = TokenValidator