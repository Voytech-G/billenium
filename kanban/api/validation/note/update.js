const validateUpdateNote = (noteId, content, rowIndex, columnId) => {
    if (noteId == null) {
        throw new Error(`Note ID is required`)
    }
    
    if (content == null) {
        throw new Error(`Note content is required`)
    }

    if (rowIndex == null) {
        throw new Error(`Note row index is required`)
    }

    if (columnId == null) {
        throw new Error(`Column ID is required`)
    }
}

module.exports = validateUpdateNote;