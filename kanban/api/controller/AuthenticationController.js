const AuthenticationValidator = require('../validation/authentication/AuthenticationValidator')
const UserService = require('../service/UserService')

class AuthenticationController {
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