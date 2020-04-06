const userConfig = require('../../config/user')
const ValidatorAbstract = require('../ValidatorAbstract')
const TokenValidator = require('../token/TokenValidator')

class AuthenticationValidator extends ValidatorAbstract {
    /**
     * Validate authenticate request
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateAuthenticateRequest(payload) {
        TokenValidator.validateToken(payload.token)

        return
    }

    /**
     * Validate sign up request
     * 
     * @param {Object} payload
     * @return {void} 
     */
    static validateSignUpRequest(payload) {
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
     * Validate sign in request data
     * 
     * @param {Object} payload
     * @return {void} 
     */
    static validateSignInRequest(payload) {
        this.validateUsername(payload.username)

        this.validatePIN(payload.pin)

        return
    }
}

module.exports = AuthenticationValidator