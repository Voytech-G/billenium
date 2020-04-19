const mongoose = require('mongoose')
const capitalize = require('../helpers/capitalize')

class ValidatorAbstract {
    /**
     * Check if given model ID is valid
     * 
     * @param {String} taskId 
     * @return {void}
     */
    static checkObjectIDValid(modelId, modelName) {
        try {
            if (modelId == null) {
                throw new Error(`${capitalize(modelName)} ID is required`)
            }

            if(!mongoose.Types.ObjectId.isValid(modelId)) {
                throw new Error(`Valid ${modelName} ID is required`)
            }
    
            return
        } catch (exception) {
            throw new Error(`Mongoose object ID validation failed: ${exception.message}`)
        }
    }
}

module.exports = ValidatorAbstract