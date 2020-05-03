const UserValidator = require('../validation/user/UserValidator')
const UserService = require('../service/UserService')

class UserController {
    /**
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async update(payload, callback) {
        try {
            UserValidator.validateUpdateUserRequest(payload)

            const updatedUser = await UserService.updateUser(payload)

            callback({
                status: true,
                payload: updatedUser,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `${exception.message}`,
            })

            return
        }
    }

    /**
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async remove(payload, callback) {
        try {
            UserValidator.validateRemoveUserRequest(payload)

            const removedUser = await UserService.removeUser(payload)

            callback({
                status: true,
                payload: removedUser,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `${exception.message}`,
            })

            return
        }
    }

    /**
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async getOne(payload, callback) {
        try {
            UserValidator.validateGetOneUserRequest(payload)

            const user = await UserService.getOneUser(payload)

            callback({
                status: true,
                payload: user,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `${exception.message}`,
            })

            return
        }
    }

    /**
     * @param {Object} payload 
     * @param {Function} callback 
     */
    static async getAll(callback) {
        try {
            const users = await UserService.getAllUsers()

            callback({
                status: true,
                payload: users,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `${exception.message}`,
            })

            return
        }
    }
}

module.exports = UserController