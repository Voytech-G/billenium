const ColumnRepository = require('../database/repository/ColumnRepository')
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
     * @param {Object|null} payload
     * @param {Function} callback
     * @return {void}
     */
    static async getOne(callback) {
        try {
            let columns = await ColumnRepository.findAll()
        
            callback({
                status: true,
                payload: {
                    columns,
                }
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
}

module.exports = ProjectController