const mongoose = require('mongoose')
const Subproject = require('../model/Subproject')

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
}

module.exports = SubprojectRepository