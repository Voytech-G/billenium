const UserValidator = require('../user/UserValidator')
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
            UserValidator.validateUsername(username)
    
            const PIN = payload.pin
            UserValidator.validatePIN(PIN)
    
            const firstName = payload.first_name
            UserValidator.validateFirstName(firstName)
    
            const lastName = payload.last_name
            UserValidator.validateLastName(lastName)
    
            const userType = payload.user_type
            UserValidator.validateUserType(userType)
    
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
            UserValidator.validateUsername(username)
    
            const PIN = payload.pin
            UserValidator.validatePIN(PIN)
    
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
            UserValidator.validateUsername(username)

            const firstName = payload.first_name
            UserValidator.validateFirstName(firstName)
            
            const lastName = payload.last_name
            UserValidator.validateLastName(lastName)

            const userType = payload.user_type
            UserValidator.validateUserType(userType) 
    
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