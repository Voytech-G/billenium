const validateNoteRemove = response => {
    if (response.deletedCount !== 1) {
        throw new Error('Found no notes of given ID')
    }
}

module.exports = validateNoteRemove