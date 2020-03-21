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
        if (modelId == null) {
            throw new Error(`${capitalize(modelName)} ID is required`)
        }

        if(!mongoose.Types.ObjectId.isValid(modelId)) {
            throw new Error(`Valid ${modelName} ID is required`)
        }

        return
    }
}

module.exports = ValidatorAbstract