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
     * Find one project by ID and update it with given values
     * 
     * @param {String} projectId 
     * @param {String} projectName 
     * @param {Number} usedBudget 
     * @param {Number} totalBudget
     * @return {Object} 
     */
    static async findByIdAndUpdate(projectId, projectName, usedBudget, totalBudget) {
        const update = {
            project_name: projectName,
            used_budget: usedBudget,
            total_budget: totalBudget,
        }

        const project = await Project.findByIdAndUpdate(projectId, update, {
            new: projectConfig.repository.RETURN_NEW_AFTER_UPDATE,
            useFindAndModify: projectConfig.repository.USE_FIND_AND_MODIFY,
        })

        if (project == null) {
            throw new Error('No project of given ID found, couldn\'t update')
        }

        return project
    }

    /**
     * Find project by project ID and remove it
     * 
     * @param {String} projectId 
     * @return {Object} // removed project
     */
    static async findByIdAndRemove(projectId) {
        const project = await Project.findById(projectId)

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
     * @param {String} projectId 
     * @param {Array} populateFields
     * @return {Object}
     */
    static async findByIdAndPopulate(projectId, populateFields) {
        const project = await Project.findById(projectId)

        if (project == null) {
            throw new Error('Failed to populate the project, found no project of given ID')
        }

        // need to call execPopulate() method as populating previously retrieved document needs 
        // that method to get called
        return await project.populate(populateFields).execPopulate()
    }
}

module.exports = ProjectRepository