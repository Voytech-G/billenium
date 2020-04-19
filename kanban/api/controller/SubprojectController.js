const SubprojectValidator = require('../validation/subproject/SubprojectValidator')
const SubprojectService = require('../service/SubprojectService')

class SubprojectController {
    /**
     * Create a subproject
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async create(payload, callback) {
        try {
            SubprojectValidator.validateCreateRequest(payload)

            const subproject = await SubprojectService.createSubproject(payload)

            callback({
                status: true,
                payload: subproject,
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
     * Update a subproject
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async update(payload, callback) {
        try {
            SubprojectValidator.validateUpdateRequest(payload)

            const subproject = await SubprojectService.updateSubproject(payload)

            callback({
                status: true,
                payload: subproject,
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
     * Remove a subproject
     * 
     * @param {Object} payload 
     * @param {Function} callback
     * @return {void} 
     */
    static async remove(payload, callback) {
        try {
            SubprojectValidator.validateRemoveRequest(payload)

            const subproject = await SubprojectService.removeSubproject(payload)

            callback({
                status: true,
                payload: subproject,
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
     * Get single subproject
     * 
     * @param {Object} payload
     * @param {Function} callback
     * @return {void}
     */
    static async getOne(payload, callback) {
        try {
            SubprojectValidator.validateGetOneRequest(payload)

            const subproject = await SubprojectService.getOneSubproject(payload)
        
            callback({
                status: true,
                payload: subproject,
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
     * Assign task to subproject
     * 
     * @param {Object} payload
     * @param {Function} callback
     * @return {void}
     */
    static async assignTask(payload, callback) {
        try {
            SubprojectValidator.validateChangeTaskAssignedToSubprojectStateRequest(payload)

            const subprojectId = payload.subproject_id
            const taskId = payload.task_id
            await SubprojectService.assignTaskToSubproject(subprojectId, taskId)

            callback({
                status: true,
            })
            
            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message
            })

            return
        }
    }

    /**
     * Unassign task from subproject
     * 
     * @param {Object} payload
     * @param {Function} callback
     * @return {void}
     */
    static async unassignTask(payload, callback) {
        try {
            SubprojectValidator.validateChangeTaskAssignedToSubprojectStateRequest(payload)
            
            const subprojectId = payload.subproject_id
            const taskId = payload.task_id
            await SubprojectService.unassignTaskFromSubproject(subprojectId, taskId)

            callback({
                status: true,
            })
            
            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message
            })

            return
        }
    }
}

module.exports = SubprojectController