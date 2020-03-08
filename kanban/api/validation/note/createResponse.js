const validateCreateNoteResponse = result => {
    if (result == null) {
        throw new Error('It seems like the note has not been created')
    }

    if (!(result instanceof Object)) {
        throw new Error('Invalid response')
    }
}

module.exports = validateCreateNoteResponse