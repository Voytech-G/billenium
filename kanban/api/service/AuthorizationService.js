const AuthorizationValidator = require('../validation/authorization/AuthorizationValidator')
const UserRepository = require('../database/repository/UserRepository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const appConfig = require('../config/app')

class AuthorizationService {
    // TODO think about a better place for those types
    // list of events that will not be authenticated
    static AUTHENTICATION_EXCLUDED_EVENTS = ['sign-in', 'sign-up', 'authenticate']

    /**
     * Return true, if given event type is excluded from authentication
     * 
     * @param {String} eventType
     * @return {Boolean} 
     */
    static isEventTypeExcludedFromAuthentication(eventType) {
        return this.AUTHENTICATION_EXCLUDED_EVENTS.includes(eventType)
    }

    /**
     * Set authenticated socket data
     * 
     * @param {Object} socket
     * @param {Object} data
     * @return {void}
     */
    static setSocketAuthenticationData(socket, data) {
        try {
            const socketData = this.createSessionDataObject(data)
    
            socket.authenticated = true
            socket.session_data = socketData
    
            return
        } catch (exception) {
            throw new Error(`Setting socket session data failed: ${exception.message}`)
        }
    }

    /**
     * Check if socket is authenticated
     * 
     * @param {Object} socket
     * @return {Boolean} 
     */
    static isSocketAuthenticated(socket) {
        if (socket.authenticated == null) {
            return false
        }

        return true
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
            first_name: tokenData.first_name,
            last_name: tokenData.last_name,
            user_type: tokenData.user_type,
            initials: tokenData.initials,
        }
    }

    /**
     * Create an object containing data about user
     * 
     * @param {Object} tokenData
     * @return {Object}
     */
    static createSessionDataObject(data) {
        try {
            AuthorizationValidator.validateCreateSessionDataObjectRequest(data)
    
            return {
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                user_type: data.user_type,
                initials: data.initials,
            }
        } catch (exception) {
            throw new Error(`Failed to create socket session data object: ${exception.message}`)
        }
    }

    /**
     * Authorize incoming event (check if user is authorized to make that request)
     * 
     * @param {Object} payload 
     * @param {Function} next 
     */
    static authorizeEvent(socket, payload, next) {
        console.log('authorizing event')

        next()

        return
    }

    /**
     * Authenticate incoming event (check if user is logged in)
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static authenticateEvent(socket, payload, next) {
        const eventType = payload[0]

        // if given event type is excluded from authentication stop
        if (this.isEventTypeExcludedFromAuthentication(eventType)) {
            next()

            return
        }

        // if socket is authenticated
        if (this.isSocketAuthenticated(socket)) {
            next()

            return
        }

        next(new Error('Socket not authenticated'))

        return
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
        try {
            const tokenData = await this.verifyAuthenticationToken(token)
            
            // set socket object data (user data and flag indicating that the socket is authenticated)
            this.setSocketAuthenticationData(socket, tokenData.data)
            
            return tokenData
        } catch (exception) {
            throw new Error(`Authentication failed: ${exception.message}`)
        }
    }

    /**
     * Decode data about authenticated user from given token
     * 
     * @param {String} token
     * @return {Promise} 
     */
    static async verifyAuthenticationToken(token) {
        try {
            const encryptionSecret = this.getEncryptionSecret()
    
            return new Promise((resolve, reject) => {
                jwt.verify(token, encryptionSecret, (error, decoded) => {
                    if (error) {
                        reject(new Error(`Token verification failed, reason: ${error.message}`))
                    }
    
                    resolve(decoded)
                })
            })
        } catch (exception) {
            throw new Error(`Verification of authentication token failed: ${exception.message}`)
        }
    }

    /**
     * Get secret used to encrypt the connection
     * 
     * @return {String}
     */
    static getEncryptionSecret() {
        try {
            return appConfig.authentication.secret
        } catch (exception) {
            throw new Error(`Failed to get encryption secret: ${exception.message}`)
        }
    }

    /**
     * Return hashed string
     * 
     * @param {String} plainText
     * @return {String} 
     */
    static async getHash(plainText, saltRounds) {
        try {
            if (plainText == null || plainText == "") {
                throw new Error('Cannot get hash from an empty plain text.')
            }
    
            if (saltRounds == null || !Number.isInteger(saltRounds)) {
                throw new Error('Salt rounds number is required')
            }
    
            return await bcrypt.hash(plainText, saltRounds)
        } catch (exception) {
            throw new Error(`Failed to generate a hash: ${exception.message}`)
        }
    }

    /**
     * Sign in
     * 
     * @param {Object} socket
     * @param {Object} payload
     * @return {String} 
     */
    static async signIn(socket, payload) {
        try {
            if (this.isSocketAuthenticated(socket)) {
                throw new Error('You are already logged in.')
            }

            const username = payload.username
            const requestPIN = payload.pin
    
            const filter = {
                username,
            }
    
            // find one user by username
            const result = await UserRepository.findManyByFilter(filter)
            
            if (result.length == 0) {
                throw new Error('Invalid username.')
            }
    
            if (result.length > 1) {
                throw new Error('Found more than 1 user with that username.')
            }
    
            const userData = result[0]
    
            const databasePINHash = userData.pin
            await this.validatePIN(requestPIN, databasePINHash)
    
            this.setSocketAuthenticationData(socket, userData)
    
            // user signed in, sign JWT token
            return await this.signJWTToken(userData)
        } catch (exception) {
            throw new Error(`Failed to sign in: ${exception.message}`)
        }
    }

    /**
     * Validate given PIN code against PIN code hash from database
     * 
     * @param {String} requestPIN 
     * @param {String} databasePINHash
     * @return {void} 
     */
    static async validatePIN(requestPIN, databasePINHash) {
        try {
            if (databasePINHash == null) {
                throw new Error('Failed to retrieve user\'s PIN code hash.')
            }
    
            // true, if given password is valid
            const passwordCorrect = await bcrypt.compare(requestPIN, databasePINHash)
    
            if (!passwordCorrect) {
                throw new Error('Invalid password.')
            }
    
            return
        } catch (exception) {
            throw new Error(`PIN validating failed: ${exception.message}`)
        }
    }

    /**
     * Get a token with encrypted user data in it
     * 
     * @param {Object} user
     * @return {String} 
     */
    static async signJWTToken(user) {
        try {
            return new Promise((resolve, reject) => {
                const encryptionSecret = this.getEncryptionSecret()
                const tokenData = this.createSessionDataObject(user)
    
                jwt.sign({
                    data: tokenData,
                }, encryptionSecret, {
                    expiresIn: appConfig.authentication.JWTTokenExpiresInSeconds
                }, (error, token) => {
                    if (error) {
                        reject('Failed to sign the token')
    
                        return
                    }
    
                    resolve(token)
                })
            })
        } catch (exception) {
            throw new Error(`Failed to sign JWT Token: ${exception.message}`)
        }
    }
}

module.exports = AuthorizationService