const User = require('../model/User')
const userConfig = require('../../config/user')
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

    /**
     * Find one user by filter
     * 
     * @param {Object} filter
     * @return {Object}
     */
    static async findOneByFilter(filter) {
        return await User.findOne(filter)
    }

    /**
     * @param {Object} user
     * @return {Object} 
     */
    static async remove(user) {
        if (user == null) {
            throw new Error('Cannot remove an empty user')
        }

        return await user.remove()
    }

    /**
     * Update given user
     * 
     * @param {String} userId
     * @param {Object} update 
     */
    static async update(userId, update) {
        return await User.findByIdAndUpdate(userId, update, {
            new: userConfig.repository.RETURN_NEW_AFTER_UPDATE,
            useFindAndModify: userConfig.repository.USE_FIND_AND_MODIFY,
        })
    }
}

module.exports = UserRepository