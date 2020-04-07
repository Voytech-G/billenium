const AuthorizationValidator = require('../validation/authorization/AuthorizationValidator')
const AuthorizationService = require('../service/AuthorizationService')
const UserService = require('../service/UserService')

class AuthorizationController {
    /**
     * Authenticate session
     * 
     * @param {Object} socket
     * @param {Object} payload 
     * @param {Function} callback
     * @return {void} 
     */
    static async authenticate(socket, payload, callback) {
        try {
            // validate fields in request
            AuthorizationValidator.validateAuthenticateRequest(payload)

            // decode received token, validate it
            const token = payload.token
            const tokenData = await AuthorizationService.authenticate(socket, token)

            // select fields from token data that will be sent back to the user
            const response = AuthorizationService.getAuthenticationResponseFromTokenData(tokenData.data)

            callback({
                status: true,
                message: `Successfully authenticated`,
                payload: response,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Authentication failed: ${exception.message}`,
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
            AuthorizationValidator.validateSignUpRequest(payload)

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

    /**
     * Sign in, return JWT token
     * 
     * @param {Object} socket
     * @param {Object} payload 
     * @param {Function} callback 
     */
    static async signIn(socket, payload, callback) {
        try {
            AuthorizationValidator.validateSignInRequest(payload)

            const token = await AuthorizationService.signIn(socket, payload)

            callback({
                status: true,
                message: 'Successfully signed in',
                payload: token,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `An error occured while signing in: ${exception.message}`
            })

            return
        }
    }
}

module.exports = AuthorizationController