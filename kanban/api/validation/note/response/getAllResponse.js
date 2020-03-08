const validateGetAllResponse = result => {
    if (!Array.isArray(result)) {
        throw new Error('Invalid response')
    }
}

module.exports = validateGetAllResponse