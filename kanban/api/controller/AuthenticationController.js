const AuthenticationValidator = require('../validation/authentication/AuthenticationValidator')
const AuthenticationService = require('../service/AuthenticationService')
const UserService = require('../service/UserService')

class AuthenticationController {
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
            AuthenticationValidator.validateAuthenticateRequest(payload)

            // decode received token, validate it
            const token = payload.token
            const tokenData = await AuthenticationService.authenticate(socket, token)

            // select fields from token data that will be sent back to the user
            const response = AuthenticationService.getAuthenticationResponseFromTokenData(tokenData)

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

    /**
     * Sign in, return JWT token
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     */
    static async signIn(payload, callback) {
        try {
            AuthenticationValidator.validateSignInRequest(payload)

            const token = await AuthenticationService.signIn(payload)

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

module.exports = AuthenticationController