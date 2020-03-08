const validateGetAll = result => {
    if (!Array.isArray(result)) {
        throw new Error('Invalid response')
    }
}

module.exports = validateGetAll