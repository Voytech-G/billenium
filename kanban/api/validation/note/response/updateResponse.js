const validateUpdateNoteResponse = result => {
    if (result == null) {
        throw new Error('No notes updated')
    }
}

module.exports = validateUpdateNoteResponse