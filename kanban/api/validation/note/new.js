const validateNewNote = (content, rowIndex, columnId) => {
    if (content == null) {
        throw new Error(`Failed to create a new note: Note content is required`)
    }

    if (rowIndex == null) {
        throw new Error(`Failed to create a new note: Row index is required`)
    }

    if (columnId == null) {
        throw new Error(`Failed to create a new note: Column ID is required`)
    }
}

module.exports = validateNewNote