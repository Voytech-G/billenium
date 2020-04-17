const ValidatorAbstract = require('../ValidatorAbstract')

class ProjectValidator extends ValidatorAbstract {
    /**
     * Validate project create request data
     * 
     * @param {Object} payload
     * @return {void} 
     */
    static validateCreateRequest(payload) {
        try {
            if (payload.project_name == null) {
                throw new Error('Project name is required')
            }
    
            if (payload.total_budget == null) {
                throw new Error('Project total budget is required')
            } 
    
            return
        } catch (exception) {
            throw new Error(`Create project request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate update project request
     * 
     * @param {Object} payload
     * @return {void}
     */
    static validateUpdateRequest(payload) {
        try {
            if (payload.project_name == null) {
                throw new Error('Project name is required')
            }
    
            if (payload.used_budget == null) {
                throw new Error('Project used budget is required')
            }
    
            if (payload.total_budget == null) {
                throw new Error('Project total budget is required')
            }
    
            return
        } catch (exception) {
            throw new Error(`Update project request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate remove project request
     * 
     * @param {Object} payload
     * @return {void}
     */
    static validateRemoveRequest(payload) {
        try {
            const projectId = payload.project_id
            this.checkProjectObjectIDValid(projectId)
    
            return
        } catch (exception) {
            throw new Error(`Remove project request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate get project request
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateGetOneRequest(payload) {
        try {
            const projectId = payload.project_id
            this.checkProjectObjectIDValid(projectId)
            
            return
        } catch (exception) {
            throw new Error(`Get one project request validation failed: ${exception.message}`)
        }
    }

    /**
     * @param {String} id
     * @return {void} 
     */
    static checkProjectObjectIDValid(id) {
        this.checkObjectIDValid(id, 'project')
    }
}

module.exports = ProjectValidator