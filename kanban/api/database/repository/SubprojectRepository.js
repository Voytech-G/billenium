const mongoose = require('mongoose')
const Subproject = require('../model/Subproject')
const subprojectConfig = require('../../config/subproject')

class SubprojectRepository {
    /**
     * Create a new subproject
     * 
     * @param {String} subprojectName 
     * @return {Object}
     */
    static async create(subprojectName, parentProjectId) {
        const newProject = new Subproject({
            _id: new mongoose.Types.ObjectId(),
            subproject_name: subprojectName,
            project: parentProjectId,
        })

        return await newProject.save()
    }

    /**
     * Update one subproject by given subproject ID
     * 
     * @param {String} subprojectId 
     * @param {Object} update
     * @return {Object|null} 
     */
    static async update(subprojectId, update) {
        return await Subproject.findByIdAndUpdate(subprojectId, update, {
            new: subprojectConfig.repository.RETURN_NEW_AFTER_UPDATE,
            useFindAndModify: subprojectConfig.repository.USE_FIND_AND_MODIFY,
        })
    }

    /**
     * Remove subproject of given ID
     * 
     * @param {Object} subproject
     * @return {Object} 
     */
    static async remove(subproject) {
        if (subproject == null) {
            throw new Error('Cannot remove an empty subproject')
        }

        return await subproject.remove()
    }

    /**
     * Find one subproject by ID
     * 
     * @param {String} subprojectId
     * @return {Object} 
     */
    static async findById(subprojectId) {
        return await Subproject.findById(subprojectId)
    }

    /**
     * Find many subprojects with specified parameters as filter
     * 
     * @param {Object} filter 
     * @return {Object}
     */
    static async findManyByFilter(filter) {
        return await Subproject.find(filter)
    }

    /**
     * Populate given subproject's selected fields
     * 
     * @param {Object} subproject 
     * @param {Object} populateConfig 
     */
    static async populate(subproject, populateConfig) {
        if (subproject == null) {
            throw new Error('Cannot populate an empty subproject')
        }

        return await subproject.populate(populateConfig).execPopulate()
    }
}

module.exports = SubprojectRepository