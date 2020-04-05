const AuthenticationValidator = require('../validation/authentication/AuthenticationValidator')
const AuthenticationService = require('../service/AuthenticationService')
const UserService = require('../service/UserService')

class AuthenticationController {
    static async authenticate(payload, callback) {
        try {
            AuthenticationValidator.validateAuthenticateRequest(payload)

            const response = await AuthenticationService.authenticate(payload)

            callback({
                status: true,
                message: `Successfully authorized`,
                payload: response,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Authorization failed: ${exception.message}`,
            })

            return
        }
    }

    /**
     * Sign up a new user
     * 
     * @param {Object} payload 
     * @param {Function} callback
     * @return {Object} 
     */
    static async signUp(payload, callback) {
        try {
            AuthenticationValidator.validateSignUpRequest(payload)

            const user = await UserService.createUser(payload)

            callback({
                status: true,
                message: 'Successfully signed up',
                payload: user,
            })

            return
        } catch (exception) {
            callback ({
                status: false,
                message: `An error occured while signing up: ${exception.message}`
            })

            return
        }
    }
}

module.exports = AuthenticationController