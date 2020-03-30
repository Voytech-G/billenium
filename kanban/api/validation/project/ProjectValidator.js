class ProjectValidator {
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
}

module.exports = ProjectValidator