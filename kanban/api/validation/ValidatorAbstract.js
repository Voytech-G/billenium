class ValidatorAbstract {
    /**
     * Check if given model ID is valid
     * 
     * @param {String} taskId 
     */
    static checkObjectIDValid(modelId, modelName) {
        if (modelId == null) {
            throw new Error(`${capitalize(modelName)} ID is required`)
        }

        if(!(modelId instanceof mongoose.Schema.Types.ObjectId)) {
            throw new Error(`Valid ${modelName} ID is required`)
        }

        return
    }
}

module.exports = ValidatorAbstract