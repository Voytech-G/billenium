const ValidatorAbstract = require('../ValidatorAbstract')

class ProjectValidator extends ValidatorAbstract {
    /**
     * Validate project create request data
     * 
     * @param {Object} payload
     * @return {void} 
     */
    static validateCreateRequest(payload) {
        if (payload.project_name == null) {
            throw new Error('Project name is required')
        }

        if (payload.total_budget == null) {
            throw new Error('Project total budget is required')
        } 

        return
    }

    /**
     * Validate update project request
     * 
     * @param {Object} payload
     * @return {void}
     */
    static validateUpdateRequest(payload) {
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
    }

    /**
     * Validate remove project request
     * 
     * @param {Object} payload
     * @return {void}
     */
    static validateRemoveRequest(payload) {
        this.checkObjectIDValid(payload.project_id)

        return
    }

    /**
     * Validate get project request
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateGetOneRequest(payload) {
        this.checkObjectIDValid(payload.project_id)
        
        return
    }
}

module.exports = ProjectValidator