const mongoose = require('mongoose')

class TransactionHandler {
    /**
     * Run given set of database operations in mongoose transaction
     * 
     * @param {Function} operationsSet 
     * @return {void}
     */
    static async run(operationsSet) {
        const session = await mongoose.startSession()
        
        try {
            await session.startTransaction()

            const result = await operationsSet()

            await session.commitTransaction()
            await session.endSession()

            return result
        } catch (exception) {
            await session.abortTransaction()
            await session.endSession()

            throw exception
        }
    }
}

module.exports = TransactionHandler