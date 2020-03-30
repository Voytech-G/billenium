const ProjectValidator = require('../validation/project/ProjectValidator')
const ProjectService = require('../service/ProjectService')

class ProjectController {
    /**
     * Create a project
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async create(payload, callback) {
        try {
            ProjectValidator.validateCreateRequest(payload)

            const project = await ProjectService.createProject(payload)

            callback({
                status: true,
                message: 'Successfully created a project',
                payload: project,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to create a project: ${exception.message}`,
            })

            return
        }
    }

    /**
     * Update a project
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async update(payload, callback) {
        try {
            ProjectValidator.validateUpdateRequest(payload)

            const project = await ProjectService.updateProject(payload)

            callback({
                status: true,
                message: 'Successfully updated the project',
                payload: project,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to update the project: ${exception.message}`,
            })

            return
        }
    }

    /**
     * Remove a project
     * 
     * @param {Object} payload 
     * @param {Function} callback
     * @return {void} 
     */
    static async remove(payload, callback) {
        try {
            ProjectValidator.validateRemoveRequest(payload)

            const project = await ProjectService.removeProject(payload)

            callback({
                status: true,
                message: 'Successfully removed the project',
                payload: project,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to remove the project: ${exception.message}`,
            })

            return
        }
    }

    /**
     * Get data about a project, list of columns and tasks assigned to it
     * 
     * @param {Object} payload
     * @param {Function} callback
     * @return {void}
     */
    static async getOne(payload, callback) {
        try {
            ProjectValidator.validateGetOneRequest(payload)

            const project = await ProjectService.getOneProject(payload)
        
            callback({
                status: true,
                payload: project,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `An error occured while getting the project: ${exception.message}`
            })

            return
        }
    }

    /**
     * Get array of all projects
     * 
     * @param {Function} callback
     * @return {void} 
     */
    static async getAll(callback) {
        try {
            const projects = await ProjectService.getAllProjects()

            callback({
                status: true,
                payload: projects,
            })
            
            return
        } catch (exception) {
            callback({
                status: false,
                message: `An error occured while getting list of all projects: ${exception.message}`,
            })
            
            return
        }
    }
}

module.exports = ProjectController