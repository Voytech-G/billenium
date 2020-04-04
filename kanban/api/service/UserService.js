const UserRepository = require('../database/repository/UserRepository')
const AuthenticationService = require('../service/AuthenticationService')
const UserTypes = require('../database/dictionary/user/UserTypes')
const userConfig = require('../config/user')

class UserService {
    /**
     * Create a user
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async createUser(payload) {
        const username = payload.username
        const pin = await this.getPinHash(payload.pin)
        const firstName = payload.first_name
        const lastName = payload.last_name
        const userType = payload.user_type
        const initials = this.getUserInitials(firstName, lastName)
        
        this.validateUserType(userType)
        await this.validateUsernameNotTaken(username)

        return await UserRepository.createUser(username, pin, firstName, lastName, userType, initials)
    }

    /**
     * Check if given user type key is a valid available type
     * 
     * @param {String} type 
     */
    static validateUserType(type) {
        const userTypes = UserTypes.getKeysArray()

        if (userTypes.includes(type)) {
            return
        }
        
        throw new Error('Given user type is invalid')
    }

    /**
     * Get hashed pin
     * 
     * @param {String} pin
     * @return {String} 
     */
    static async getPinHash(pin) {
        const saltRounds = userConfig.authentication.saltRounds

        return await AuthenticationService.getHash(pin, saltRounds)
    }

    /**
     * Get first letter of first name and first letter of last name
     * 
     * @param {String} firstName 
     * @param {String} lastName 
     * @return {String}
     */
    static getUserInitials(firstName, lastName) {
        return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
    }

    /**
     * Check if given username is already taken
     * 
     * @param {String} username
     * @return {void}
     */
    static async validateUsernameNotTaken(username) {
        const filter = {
            username
        }
        
        // find all users with given username
        const users = await UserRepository.findManyByFilter(filter)

        // check if found no users with given username
        if (users.length == 0) {
            return
        }

        throw new Error(`Username: ${username} is taken`)
    }
}

module.exports = UserService