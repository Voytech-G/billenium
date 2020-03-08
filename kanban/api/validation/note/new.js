const validateNewNote = (content, rowIndex, columnId) => {
    if (content == null) {
        throw new Error(`Note content is required`)
    }

    if (rowIndex == null) {
        throw new Error(`Row index is required`)
    }

    if (columnId == null) {
        throw new Error(`Column ID is required`)
    }
}

module.exports = validateNewNote