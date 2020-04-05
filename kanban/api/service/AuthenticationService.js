const AuthenticationValidator = require('../validation/authentication/AuthenticationValidator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const appConfig = require('../config/app')

class AuthenticationService {
    /**
     * Authenticate incoming socket io event
     * 
     * @param {Object} payload 
     * @param {Function} next
     * @return {Boolean}
     */
    static async authenticateIncomingEvent(payload) {
        // payload[0] is the event name, payload[1] is the actual data carried in the event, payload[2] is the callback
        const eventPayload = payload[1]
        const callback = payload[2]
        
        try {
            AuthenticationValidator.validateAuthenticateRequest(eventPayload)
        
            const token = eventPayload.token
            await AuthenticationService.authenticate(token)

            return true
        } catch (exception) {
            callback({
                status: false,
                message: `Authentication failed: ${exception.message}`,
            })

            return false
        }
    }

    /**
     * Authenticate user.
     * 
     * Check given authentication token, check its validity, return data about authenticated user
     * 
     * @param {String} token
     * @return {Object} 
     */
    static async authenticate(token) {
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