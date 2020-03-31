const Project = require('../model/Project')
const mongoose = require('mongoose')

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
     * Find one project by project ID
     * 
     * @param {String} projectId
     * @return {Object|null}
     */
    static async findById(projectId) {
        return await Project.findById(projectId)
    }
}

module.exports = ProjectRepository