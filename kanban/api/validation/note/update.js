const validateUpdateNote = (noteId, content, rowIndex, columnId) => {
    if (noteId == null) {
        throw new Error(`Failed to update the note: Note ID is required`)
    }
    
    if (content == null) {
        throw new Error(`Failed to update the note: Note content is required`)
    }

    if (rowIndex == null) {
        throw new Error(`Failed to update the note: Note row index is required`)
    }

    if (columnId == null) {
        throw new Error(`Failed to update the note: Column ID is required`)
    }
}

module.exports = validateUpdateNote;