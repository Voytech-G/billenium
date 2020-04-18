const UserRepository = require('../database/repository/UserRepository')
const AuthorizationService = require('../service/AuthorizationService')
const UserTypes = require('../database/dictionary/user/UserTypes')
const appConfig = require('../config/app')

class UserService {
    /**
     * Create a user
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async createUser(payload) {
        try {
            const username = payload.username
            const pin = await this.getPinHash(payload.pin)
            const firstName = payload.first_name
            const lastName = payload.last_name
            const userType = payload.user_type
            const initials = this.getUserInitials(firstName, lastName)
            
            this.validateUserType(userType)
            await this.validateUsernameNotTaken(username)
    
            const createdUser = await UserRepository.createUser(username, pin, firstName, lastName, userType, initials)
        
            if (createdUser == null) {
                throw new Error('An error occured, no user created.')
            }
        } catch (exception) {
            throw new Error(`Failed to create a user: ${exception.message}`)
        }
    }

    static async updateUser(payload) {

    }

    static async removeUser(payload) {

    }

    static async getOneUser(payload) {
        
    }

    /**
     * Check if given user type key is a valid available type
     * 
     * @param {String} type 
     */
    static validateUserType(type) {
        try {
            const userTypes = UserTypes.getKeysArray()
    
            if (!userTypes.includes(type)) {
                throw new Error('Given user type is invalid')
            }
            
            return
        } catch (exception) {
            throw new Error(`User type validation failed: ${exception.message}`)
        }
    }

    /**
     * Get hashed pin
     * 
     * @param {String} pin
     * @return {String} 
     */
    static async getPinHash(pin) {
        try {
            const saltRounds = appConfig.authentication.userPINHashSaltRounds
    
            return await AuthorizationService.getHash(pin, saltRounds)
        } catch (exception) {
            throw new Error(`Failed to get PIN hash: ${exception.message}`)
        }
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
        try {
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
        } catch (exception) {
            throw new Error(`Username availability validation failed: ${exception.message}`)
        }
    }
}

module.exports = UserService