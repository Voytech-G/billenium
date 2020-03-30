const Project = require('../model/Project')

class ProjectRepository {
    /**
     * Create a new project
     * 
     * @param {String} projectName 
     * @param {Number} totalBudget 
     */
    static async create(projectName, totalBudget) {
        const newProject = new Project({
            project_name: projectName,
            total_budget: totalBudget,
        })

        return await newProject.save()
    }
}

module.exports = ProjectRepository