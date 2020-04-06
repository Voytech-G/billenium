const AuthenticationService = require('./AuthenticationService')

class AuthorizationService {
    /**
     * Authorize incoming event (check if event requires the user to be authenticated and check a series of authorization rules)
     * 
     * @param {Object} payload 
     * @param {Function} next 
     */
    static authorizeEvent(socket, payload, next) {
        console.log('authorizing event')

        next()

        return
    }
}

module.exports = AuthorizationService