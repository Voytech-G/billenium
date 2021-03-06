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
                payload: project,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message,
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
                payload: project,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message,
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
                payload: project,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message,
            })

            return
        }
    }

    /**
     * Get single project
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
                message: exception.message,
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
                message: exception.message,
            })
            
            return
        }
    }
}

module.exports = ProjectController