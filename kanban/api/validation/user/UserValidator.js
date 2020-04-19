const ValidatorAbstract = require('../ValidatorAbstract')
const userConfig = require('../../config/user')

class UserValidator extends ValidatorAbstract {
    /**
     * @param {Object} payload
     * @return {void} 
     */
    static validateUpdateUserRequest(payload) {
        try {
            const userId = payload.user_id
            this.checkUserObjectIDValid(userId)

            const username = payload.username
            this.validateUsername(username)
    
            const pin = payload.pin
            this.validatePIN(pin)
    
            const firstName = payload.first_name
            this.validateFirstName(firstName)
            
            const lastName = payload.last_name
            this.validateLastName(lastName)
    
            const userType = payload.user_type
            this.validateUserType(userType)
            
            const maxWorkInProgressTasks = payload.max_work_in_progress_tasks
            this.validateMaxWorkInProgressTasks(maxWorkInProgressTasks)
    
            return
        } catch (exception) {
            throw new Error(`Update user request validation failed: ${exception.message}`)
        }
    }

    /**
     * @param {Object} payload
     * @return {void} 
     */
    static validateRemoveUserRequest(payload) {
        try {
            const userId = payload.user_id 
            this.checkUserObjectIDValid(userId)

            return
        } catch (exception) {
            throw new Error(`Remove user request validation failed: ${exception.message}`)
        }
    }

    /**
     * @param {Object} payload
     * @return {void} 
     */
    static validateGetOneUserRequest(payload) {
        try {
            const userId = payload.user_id
            this.checkUserObjectIDValid(userId)

            return
        } catch (exception) {
            throw new Error(`Get one user request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate user ID
     * 
     * @param {String} userId
     * @return {void} 
     */
    static checkUserObjectIDValid(userId) {
        this.checkObjectIDValid(userId, 'user')

        return
    }

    /**
     * Validate username format
     * 
     * @param {String} username
     * @return {void} 
     */
    static validateUsername(username) {
        if (username == null || username == "") {
            throw new Error('Username is required')
        }
        
        const usernameLength = username.length
        if (usernameLength < userConfig.validation.minUsernameLength || usernameLength > userConfig.validation.maxUsernameLength) {
            throw new Error('Username length is invalid')
        }

        return
    }

    /**
     * Validate authentication PIN code
     * 
     * @param {String} pin
     * @return {void} 
     */
    static validatePIN(pin) {
        if (pin == null || pin == "") {
            throw new Error('PIN is required')
        }

        const pinLength = pin.length
        if (pinLength != userConfig.validation.pinLength) {
            throw new Error('Invalid PIN length')
        }

        if (isNaN(pin)) {
            throw new Error('PIN should be a number')
        }

        return
    }

    /**
     * @param {String} type 
     * @return {void}
     */
    static validateUserType(type) {
        if (type == null || type == '') {
            throw new Error('User type is required')
        }

        return
    }

    /**
     * @param {String} lastName
     * @return {void} 
     */
    static validateLastName(lastName) {
        if (lastName == null || lastName == '') {
            throw new Error('Last name is required')
        }

        const lastNameLength = lastName.length
        if (lastNameLength > userConfig.validation.maxLastNameLength || lastNameLength < userConfig.validation.minLastNameLength) {
            throw new Error('Invalid last name length')
        }

        return
    }

    /**
     * @param {String} firstName
     * @return {void} 
     */
    static validateFirstName(firstName) {
        if (firstName == null || firstName == '') {
            throw new Error('First name is required')
        }

        const firstNameLength = firstName.length
        if (firstNameLength > userConfig.validation.maxFirstNameLength || firstNameLength < userConfig.validation.minFirstNameLength) {
            throw new Error('Invalid first name length')
        }

        return
    }

    /**
     * @param {String|Number} maxWorkInProgressTasks 
     * @return {void}
     */
    static validateMaxWorkInProgressTasks(maxWorkInProgressTasks) {
        // max work in progress tasks is optional, if does not exist in request payload simply do not validate
        if (maxWorkInProgressTasks == null) {
            return
        }

        // check if is numeric
        if (isNaN(maxWorkInProgressTasks)) {
            throw new Error('Max work in progress tasks number should be a number')
        }

        return
    }
}

module.exports = UserValidator