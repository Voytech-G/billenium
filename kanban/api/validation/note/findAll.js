const validateFindAll = (error, result) => {
    if (error != null) {
        throw new Error(error)
    }

    if (!Array.isArray(result)) {
        throw new Error(`An error occured while looking for the note`)
    }
}

module.exports = validateFindAll