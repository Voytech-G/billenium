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

    /**
     * @param {Object} payload
     * @return {Object} 
     */
    static async updateUser(payload) {
        try {
            const userId = payload.user_id
            const username = payload.username
            const pin = await this.getPinHash(payload.pin)
            const firstName = payload.first_name
            const lastName = payload.last_name
            const userType = payload.user_type
            const initials = this.getUserInitials(firstName, lastName)

            this.validateUserType(userType)
            await this.validateUsernameNotTaken(username)

            // get user to update, check if it exists
            const user = await UserRepository.findById(userId)
            if (user == null) {
                throw new Error('Found no user of given ID')
            }

            const update = {
                username,
                pin,
                first_name: firstName,
                last_name: lastName,
                user_type: userType,
                initials,
            }

            // update given user, check if updated any
            const updatedUser = await UserRepository.update(userId, update)
            if (updatedUser == null) {
                throw new Error(`An error occured, no users updated`)
            }

            return updatedUser
        } catch (exception) {
            throw new Error(`Failed to update the user: ${exception}`)
        }
    }

    /**
     * @param {Object} payload
     * @return {Object} 
     */
    static async removeUser(payload) {
        try {
            const userId = payload.user_id

            // find user to be removed
            const user = await UserRepository.findById(userId)
            if (user == null) {
                throw new Error('Found no user of given ID')
            }

            // TODO unassign user from team

            await this.unassignUserFromTasks(userId)

            // remove the user
            const removedUser = await UserRepository.remove(user)
            if (removedUser == null) {
                throw new Error('An error occured, no users removed')
            }

            return removedUser
        } catch (exception) {
            throw new Error(`Failed to remove the user: ${exception}`)
        }
    }

    /**
     * @param {Object} payload
     * @return {Object} 
     */
    static async getOneUser(payload) {
        try {
            const userId = payload.user_id

            const user = await UserRepository.findById(userId)
            if (user == null) {
                throw new Error('Found no user of given ID')
            }

            return user
        } catch (exception) {
            throw new Error(`Failed to get the user: ${exception}`)
        }
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
     * Unassign user from all his tasks
     * 
     * @param {String} userId
     * @return {void} 
     */
    static async unassignUserFromTasks(userId) {
        try {
            let user = await UserRepository.findById(userId)
            if (user == null) {
                throw new Error('Found no user of given ID')
            }

            const populateConfig = [
                {
                    path: 'tasks',
                    ref: 'Task',
                }
            ]

            let populatedUser = await UserRepository.populate(user, populateConfig)
            let tasks = populatedUser.tasks

            tasks.forEach(async task => {
                task.users.pull(user)
                await task.save()

                user.tasks.pull(task)
            })

            await user.save()

            return
        } catch (exception) {
            throw new Error(`Failed to unassign user from his tasks: ${exception.message}`)
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