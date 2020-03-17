/** class representing a ColumnController */
class ColumnController {

    /**
     * Creates new controller for creating columns
     * @param {Object} payload 
     * @returns {void}
     */

    create(payload) {
        console.log(payload)
    }

    /**
     * Updates an existing controller for creating columns
     * @param {Object} payload 
     * @returns {void}
     */

    update(payload) {
        console.log(payload)
    }

     /**
     * Deletes an existing controller for creating columns
     * @param {Object} payload 
     * @returns {void}
     */

    delete(payload) {
        console.log(payload)
    }
}

module.exports = new ColumnController()