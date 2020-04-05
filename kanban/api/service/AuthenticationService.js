const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const appConfig = require('../config/app')

class AuthenticationService {
    /**
     * Authenticate user.
     * 
     * Check given authentication token, check its validity, return data about authenticated user
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async authenticate(payload) {
        const token = payload.token
    
        return await this.getAuthorizationTokenData(token)
    }

    /**
     * Decode data about authenticated user from given token
     * 
     * @param {String} token
     * @return {Promise} 
     */
    static async getAuthorizationTokenData(token) {
        const secret = this.getEncryptionSecret()

        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (error, decoded) => {
                if (error) {
                    reject(new Error(`Token verification failed, reason: ${error.message}`))
                }

                resolve(decoded)
            })
        })
    }

    /**
     * Get secret used to encrypt the connection
     * 
     * @return {String}
     */
    static getEncryptionSecret() {
        return appConfig.authentication.secret
    }

    /**
     * Return hashed string
     * 
     * @param {String} plainText
     * @return {String} 
     */
    static async getHash(plainText, saltRounds) {
        return await bcrypt.hash(plainText, saltRounds)
    }
}

module.exports = AuthenticationService