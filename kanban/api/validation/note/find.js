const validateFindNote = (error, result) => {
    if (error != null) {
        throw new Error(`An error occured while looking for the note to update: ${error}`)
    }

    if (!Array.isArray(result)) {
        throw new Error(`An error occured while looking for the note`)
    }

    if (result.length === 0) {
        throw new Error(`No notes of given ID found`)
    }

    if (result.length > 1) {
        throw new Error(`More than 1 note of given ID found`)
    }
}

module.exports = validateFindNote