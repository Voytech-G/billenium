const Project = require('../model/Project')
const mongoose = require('mongoose')
const projectConfig = require('../../config/project')

class ProjectRepository {
    /**
     * Create a new project
     * 
     * @param {String} projectName 
     * @param {Number} totalBudget 
     */
    static async create(projectName, totalBudget) {
        const newProject = new Project({
            _id: new mongoose.Types.ObjectId(),
            project_name: projectName,
            total_budget: totalBudget,
        })

        return await newProject.save()
    }

    /**
     * Find all projects
     * 
     * @return {Array}
     */
    static async findAll() {
        return await Project.find({})
    }

    /**
     * Update given project
     * 
     * @param {String} projectId
     * @param {Object} update 
     */
    static async update(projectId, update) {
        return await Project.findByIdAndUpdate(projectId, update, {
            new: projectConfig.repository.RETURN_NEW_AFTER_UPDATE,
            useFindAndModify: projectConfig.repository.USE_FIND_AND_MODIFY,
        })
    }

    /**
     * Remove given project
     * 
     * @param {Object} project
     * @return {Object} 
     */
    static async remove(project) {
        if (project == null) {
            throw new Error('Cannot remove an empty project.')
        }

        return await project.remove()
    }

    /**
     * Find one project by project ID
     * 
     * @param {String} projectId
     * @return {Object|null}
     */
    static async findById(projectId) {
        return await Project.findById(projectId)
    }

    /**
     * Get one project by given project ID, populate given fields
     * 
     * @param {Object} project
     * @param {Array} populateFields
     * @return {Object}
     */
    static async populate(project, populateFields) {
        if (project == null) {
            throw new Error('Cannot populate an empty project.')
        }

        // need to call execPopulate() method as populating previously retrieved document needs 
        // that method to get called
        return await project.populate(populateFields).execPopulate()
    }
}

module.exports = ProjectRepository