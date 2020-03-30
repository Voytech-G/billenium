const ProjectRepository = require('../database/repository/ProjectRepository')

class ProjectService {
    /**
     * Create a project
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async createProject(payload) {
        const projectName = payload.project_name
        const totalBudget = payload.total_budget

        return await ProjectRepository.create(projectName, totalBudget)
    }
}

module.exports = ProjectService