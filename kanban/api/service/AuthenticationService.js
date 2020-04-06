const AuthenticationValidator = require('../validation/authentication/AuthenticationValidator')
const TokenValidator = require('../validation/token/TokenValidator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const appConfig = require('../config/app')

class AuthenticationService {
    /**
     * Set authenticated socket data
     * 
     * @param {Object} socket
     * @param {Object} data
     * @return {void}
     */
    static setSocketAuthenticationData(socket, data) {
        socket.authenticated = true
        socket.session_data = data

        return
    }

    /**
     * Select fields from decoded JWT token data that will be sent in response to authenticate request
     * 
     * @param {Object} tokenData 
     * @return {Object}
     */
    static getAuthenticationResponseFromTokenData(tokenData) {
        return {
            username: tokenData.username,
            user_type: tokenData.user_type,
        }
    }

    /**
     * Select fields from decoded JWT token data that will be set in socket object and available in the event handler
     * its headed to
     * 
     * @param {Object} tokenData
     * @return {Object}
     */
    static getAuthenticationSocketDataFromTokenData(tokenData) {
        return {
            username: tokenData.username,
            user_type: tokenData.user_type,
        }
    }

    /**
     * Authenticate incoming socket io event
     * 
     * @param {Object} payload 
     * @param {Function} next
     * @return {Boolean}
     */
    static async authenticateIncomingEvent(socket, payload) {
        // payload[0] is the event name, payload[1] is the actual data carried in the event, payload[2] is the callback
        const eventPayload = payload[1]
        const callback = payload[2]
        
        try {
            AuthenticationValidator.validateAuthenticateRequest(eventPayload)
        
            const token = eventPayload.token
            await this.authenticate(socket, token)

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
     * @param {Object} socket
     * @param {String} token
     * @return {Object} 
     */
    static async authenticate(socket, token) {
        const tokenData = await this.getAuthorizationTokenData(token)

        // check if decoded token has valid data
        TokenValidator.validateDecodedData(tokenData)

        const socketData = this.getAuthenticationSocketDataFromTokenData(tokenData)

        // set socket object data (user data and flag indicating that the socket is authenticated)
        this.setSocketAuthenticationData(socket, socketData)

        return tokenData
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

    /**
     * Sign in
     * 
     * @param {Object} payload
     * @return {String} 
     */
    static async signIn(payload) {
        const username = payload.username
        const pin = payload.pin

        console.log(`signing in with username: ${username} and PIN: ${pin}`)

        return ''
    }
}

module.exports = AuthenticationService