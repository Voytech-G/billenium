const ProjectValidator = require('../project/ProjectValidator')
const TaskValidator = require('../task/TaskValidator')
const ValidatorAbstract = require('../ValidatorAbstract')

class SubprojectValidator extends ValidatorAbstract {
    /**
     * Validate create subproject request data
     * 
     * @param {Object} payload
     * @return {void}
     */
    static validateCreateRequest(payload) {
        try {
            const subprojectName = payload.subproject_name
            this.validateSubprojectName(subprojectName)
    
            const parentProjectId = payload.project_id
            ProjectValidator.checkProjectObjectIDValid(parentProjectId)

            const rowIndex = payload.row_index
            this.validateRowIndex(rowIndex)

            return
        } catch (exception) {
            throw new Error(`Subproject create request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate update project request data
     * 
     * @param {Object} payload
     * @return {void}
     */
    static validateUpdateRequest(payload) {
        try {
            const subprojectId = payload.subproject_id
            this.checkSubprojectObjectIDValid(subprojectId)

            const subprojectName = payload.subproject_name
            this.validateSubprojectName(subprojectName)

            return 
        } catch (exception) {
            throw new Error(`Subproject update request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate remove subproject request data
     * 
     * @param {Object} payload
     * @return {void}
     */
    static validateRemoveRequest(payload) {
        try {
            const subprojectId = payload.subproject_id
            this.checkSubprojectObjectIDValid(subprojectId)

            const projectId = payload.project_id
            ProjectValidator.checkProjectObjectIDValid(projectId)

            return
        } catch (exception) {
            throw new Error(`Subproject remove request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate get one subproject request data
     * 
     * @param {Object} payload
     * @return {void}
     */
    static validateGetOneRequest(payload) {
        try {
            const subprojectId = payload.subproject_id
            this.checkSubprojectObjectIDValid(subprojectId)

            return
        } catch (exception) {
            throw new Error(`Get one subproject request validation failed: ${exception.message}`)
        }
    }

    /**
     * @param {Object} payload
     * @return {void} 
     */
    static validateChangeTaskAssignedToSubprojectStateRequest(payload) {
        try {
            const subprojectId = payload.subproject_id
            this.checkSubprojectObjectIDValid(subprojectId)

            const taskId = payload.task_id
            TaskValidator.checkTaskObjectIDValid(taskId)

            return
        } catch (exception) {
            throw new Error(`Change task assigned to subproject state request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate subproject name
     * 
     * @param {String} name
     * @return {void}
     */
    static validateSubprojectName(name) {
        if (name == null || name == '') {
            throw new Error('Subproject name is required')
        }

        return
    }

    /**
     * @param {String} id
     * @return {void}
     */
    static checkSubprojectObjectIDValid(id) {
        this.checkObjectIDValid(id, 'subproject')

        return
    }

    /**
     * @param {String|Number} index 
     */
    static validateRowIndex(index) {
        if (index == null) {
            throw new Error('Row index is required')
        }

        if (isNaN(index)) {
            throw new Error('Row index is invalid')
        }

        return
    }
}

module.exports = SubprojectValidator