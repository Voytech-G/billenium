class DictionaryAbstract {
    /**
     * Get dictionary value by given key
     * 
     * @param {String} type 
     * @return {String}
     */
    static get(type) {
        return this.types[type]
    }

    /**
     * Get array with all dictionary types in format {key: key_name, value: value}
     * 
     * @return {Array}
     */
    static getSelect() {
        const types = this.types
        const typesKeys = Object.keys(types)

        let result = []

        for (let key of typesKeys) {
            result.push({
                key,
                value: types[key],
            })
        }

        return result
    }

    /**
     * Get array with all dictionary values
     * 
     * @return {Array}
     */
    static getValuesArray() {
        const types = this.types
        const typesKeys = Object.keys(types)

        let result = []

        for (let key of typesKeys) {
            result.push(types[key])
        }

        return result
    }

    /**
     * Get array of all dictionary keys
     * 
     * @return {Array}
     */
    static getKeysArray() {
        const types = this.types

        return Object.keys(types)
    }
}

module.exports = DictionaryAbstract