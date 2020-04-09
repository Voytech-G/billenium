const ProjectRepository = require('../database/repository/ProjectRepository')
const ColumnRepository = require('../database/repository/ColumnRepository')

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

    /**
     * Update one project
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async updateProject(payload) {
        const projectId = payload.project_id
        const projectName = payload.project_name
        const usedBudget = payload.used_budget
        const totalBudget = payload.total_budget
        
        const update = {
            project_name: projectName,
            used_budget: usedBudget,
            total_budget: totalBudget,
        }

        return await ProjectRepository.findByIdAndUpdate(projectId, update)
    }

    /**
     * Remove one project
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async removeProject(payload) {
        const projectId = payload.project_id

        return await ProjectRepository.findByIdAndRemove(projectId)
    }

    /**
     * Unassign column from project
     * 
     * @param {String} columnId 
     * @param {String} projectId
     * @return {void} 
     */
    static async unassignColumnFromProject(columnId, projectId) {
        const project = await ProjectRepository.findById(projectId)

        if (project == null) {
            throw new Error('Found no project of given ID, couldn\'t unassign removed column from the project')
        }

        project.columns.pull(columnId)

        await project.save()
    }

    /**
     * Find a project by ID, assign column found by ID to it
     * 
     * @param {String} columnId 
     * @param {String} projectId 
     * @return {void}
     */
    static async assignColumnToProject(columnId, projectId) {
        // get project we want the column to assign to
        const targetProject = await ProjectRepository.findById(projectId)

        if (targetProject == null) {
            throw new Error('Failed to assign column to the project, found no project of given ID.')
        }
        
        // get the column assigned to project
        const column = await ColumnRepository.findById(columnId)

        if (column == null) {
            throw new Error('Failed to assign column to the project, found no column of given ID.')
        }

        // push column to columns list in Project model
        targetProject.columns.push(column)

        await targetProject.save()

        return
    }

    /**
     * Get one project, populate it
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async getOneProject(payload) {
        const projectId = payload.project_id

        // populate columns field, populate tasks field in every column
        const populateConfig = [
            {
                path: 'columns',
                model: 'Column',
                populate: {
                    path: 'tasks',
                    model: 'Task',
                },
            },
        ]

        const project = await ProjectRepository.findById(projectId, populateConfig)

        if (project == null) {
            throw new Error('Found no project of given ID.')
        }

        return await ProjectRepository.populate(project, populateConfig)
    }

    /**
     * Get all projects
     * 
     * @return {Array}
     */
    static async getAllProjects() {
        return await ProjectRepository.findAll()
    }
}

module.exports = ProjectService