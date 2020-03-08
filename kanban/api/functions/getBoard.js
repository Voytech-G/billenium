const Note = require('../database/models/Note')
const Column = require('../database/models/Column')
const validateGetAllNotes = require('../validation/note/getAll')
const validateGetAllColumns = require('../validation/column/getAll')

const getBoard = async () => {
    try {
        let columns = await Column.find({})
        let notes = await Note.find({})

        validateGetAllColumns(columns)
        validateGetAllNotes(notes)

        const result = {
            columns,
            notes,
        }

        return {
            status: true,
            payload: result,
        }
    } catch (exception) {
        return {
            status: false,
            message: `An error occured while getting list of notes: ${exception.message}`
        }
    }
}

module.exports = getBoard