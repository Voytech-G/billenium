const userConfig = require('../../config/user')
const ValidatorAbstract = require('../ValidatorAbstract')
const TokenValidator = require('../token/TokenValidator')

class AuthorizationValidator extends ValidatorAbstract {
    /**
     * Validate authenticate request
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateAuthenticateRequest(payload) {
        try {
            TokenValidator.validateToken(payload.token)

            return
        } catch (exception) {
            throw new Error(`Authenticate request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate sign up request
     * 
     * @param {Object} payload
     * @return {void} 
     */
    static validateSignUpRequest(payload) {
        try {
            this.validateUsername(payload.username)
    
            this.validatePIN(payload.pin)
    
            if (payload.first_name == null || payload.first_name == "") {
                throw new Error('First name is required')
            }
    
            const firstNameLength = payload.first_name.length
    
            if (firstNameLength > userConfig.validation.maxFirstNameLength || firstNameLength < userConfig.validation.minFirstNameLength) {
                throw new Error('Invalid first name length')
            }
    
            if (payload.last_name == null || payload.last_name == "") {
                throw new Error('Last name is required')
            }
    
            const lastNameLength = payload.last_name.length
    
            if (lastNameLength > userConfig.validation.maxLastNameLength || lastNameLength < userConfig.validation.minLastNameLength) {
                throw new Error('Invalid last name length')
            }
    
            const userType = payload.user_type
    
            if (userType == null || userType == "") {
                throw new Error('User type is required')
            }
    
            return
        } catch (exception) {
            throw new Error(`Sign up request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate username format
     * 
     * @param {String} username
     * @return {void} 
     */
    static validateUsername(username) {
        try {
            if (username == null || username == "") {
                throw new Error('Username is required')
            }
            
            const usernameLength = username.length
    
            if (usernameLength < userConfig.validation.minUsernameLength || usernameLength > userConfig.validation.maxUsernameLength) {
                throw new Error('Username length is invalid')
            }
    
            return
        } catch (exception) {
            throw new Error(`Username validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate authentication PIN code
     * 
     * @param {String} pin
     * @return {void} 
     */
    static validatePIN(pin) {
        try {
            if (pin == null || pin == "") {
                throw new Error('PIN is required')
            }
    
            const pinLength = pin.length
    
            if (pinLength != userConfig.validation.pinLength) {
                throw new Error('Invalid PIN length')
            }
    
            if (isNaN(pin)) {
                throw new Error('PIN should be a number')
            }
    
            return
        } catch (exception) {
            throw new Error(`PIN validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate sign in request data
     * 
     * @param {Object} payload
     * @return {void} 
     */
    static validateSignInRequest(payload) {
        try {
            this.validateUsername(payload.username)
    
            this.validatePIN(payload.pin)
    
            return
        } catch (exception) {
            throw new Error(`Sign in request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate if data put into socket session data contains valid fields
     * 
     * @param {Object} payload
     * @return {void} 
     */
    static validateCreateSessionDataObjectRequest(payload) {
        try {
            if (payload.username == null) {
                throw new Error("Session data object requires 'username' field")
            }
    
            if (payload.first_name == null) {
                throw new Error("Session data object requires 'first name' field")
            }
    
            if (payload.last_name == null) {
                throw new Error("Session data object requires 'last name' field")
            }
    
            if (payload.user_type == null) {
                throw new Error("Session data object requires 'user type' field")
            }
    
            if (payload.initials == null) {
                throw new Error("Session data object requires 'initials' field")
            }
    
            return
        } catch (exception) {
            throw new Error(`Create session data object validation failed: ${exception.message}`)
        }
    }
}

module.exports = AuthorizationValidator