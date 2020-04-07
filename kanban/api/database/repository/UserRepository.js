const User = require('../model/User')
const mongoose = require('mongoose')

class UserRepository {
    /**
     * Create a new user
     * 
     * @param {String} username 
     * @param {String} pin 
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {String} type 
     * @param {String} initials
     * @return {Object} 
     */
    static async createUser(username, pin, firstName, lastName, userType, initials) {
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            pin,
            first_name: firstName,
            last_name: lastName,
            user_type: userType,
            initials,
        })

        return await newUser.save()
    }

    /**
     * Find user by ID
     * 
     * @param {String} userId
     * @return {Object|null} 
     */
    static async findById(userId) {
        return await User.findById(userId)
    }

    /**
     * Find many users by filter
     * 
     * @param {Object} filter 
     * @return {Array}
     */
    static async findManyByFilter(filter) {
        return await User.find(filter)
    }
}

module.exports = UserRepository