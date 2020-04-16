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
            const username = payload.username
            this.validateUsername(username)
    
            const PIN = payload.pin
            this.validatePIN(PIN)
    
            const firstName = payload.first_name
            this.validateFirstName(firstName)
    
            const lastName = payload.last_name
            this.validateLastName(lastName)
    
            const userType = payload.user_type
            this.validateUserType(userType)
    
            return
        } catch (exception) {
            throw new Error(`Sign up request validation failed: ${exception.message}`)
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
            const username = payload.username
            this.validateUsername(username)
    
            const PIN = payload.pin
            this.validatePIN(PIN)
    
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
            const username = payload.username
            this.validateUsername(username)

            const firstName = payload.first_name
            this.validateFirstName(firstName)
            
            const lastName = payload.last_name
            this.validateLastName(lastName)

            const userType = payload.user_type
            this.validateUserType(userType) 
    
            if (payload.initials == null) {
                throw new Error("Session data object requires 'initials' field")
            }
    
            return
        } catch (exception) {
            throw new Error(`Create session data object validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate username format
     * 
     * @param {String} username
     * @return {void} 
     */
    static validateUsername(username) {
        if (username == null || username == "") {
            throw new Error('Username is required')
        }
        
        const usernameLength = username.length
        if (usernameLength < userConfig.validation.minUsernameLength || usernameLength > userConfig.validation.maxUsernameLength) {
            throw new Error('Username length is invalid')
        }

        return
    }

    /**
     * Validate authentication PIN code
     * 
     * @param {String} pin
     * @return {void} 
     */
    static validatePIN(pin) {
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
    }

    /**
     * @param {String} type 
     * @return {void}
     */
    static validateUserType(type) {
        if (type == null || type == '') {
            throw new Error('User type is required')
        }

        return
    }

    /**
     * @param {String} lastName
     * @return {void} 
     */
    static validateLastName(lastName) {
        if (lastName == null || lastName == '') {
            throw new Error('Last name is required')
        }

        const lastNameLength = lastName.length
        if (lastNameLength > userConfig.validation.maxLastNameLength || lastNameLength < userConfig.validation.minLastNameLength) {
            throw new Error('Invalid last name length')
        }

        return
    }

    /**
     * @param {String} firstName
     * @return {void} 
     */
    static validateFirstName(firstName) {
        if (firstName == null || firstName == '') {
            throw new Error('First name is required')
        }

        const firstNameLength = firstName.length
        if (firstNameLength > userConfig.validation.maxFirstNameLength || firstNameLength < userConfig.validation.minFirstNameLength) {
            throw new Error('Invalid first name length')
        }

        return
    }
}

module.exports = AuthorizationValidator