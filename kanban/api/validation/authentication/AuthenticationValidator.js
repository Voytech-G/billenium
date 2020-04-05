const userConfig = require('../../config/user')
const ValidatorAbstract = require('../ValidatorAbstract')

class AuthenticationValidator extends ValidatorAbstract {
    /**
     * Validate authenticate request
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateAuthenticateRequest(payload) {
        if (payload.token == null || payload.token == "") {
            throw new Error('Authentication token is required')
        }

        return
    }

    /**
     * Validate sign up request
     * 
     * @param {Object} payload
     * @return {void} 
     */
    static validateSignUpRequest(payload) {
        if (payload.username == null || payload.username == "") {
            throw new Error('Username is required')
        }
        
        const usernameLength = payload.username.length

        if (usernameLength < userConfig.validation.minUsernameLength || usernameLength > userConfig.validation.maxUsernameLength) {
            throw new Error('Username length is invalid')
        }

        if (payload.pin == null || payload.pin == "") {
            throw new Error('PIN is required')
        }

        const pinLength = payload.pin.length

        if (pinLength != userConfig.validation.pinLength) {
            throw new Error('Invalid PIN length')
        }

        if (isNaN(payload.pin)) {
            throw new Error('PIN should be a number')
        }

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
}

module.exports = AuthenticationValidator