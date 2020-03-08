const Note = require('../../database/models/Note')
const validateFindAllNotes = require('../../validation/note/findAll')

const getBoard = async () => {
    try {
        let notes = await Note.find({})

        validateFindAllNotes(notes)

        return {
            status: true,
            payload: notes,
        }
    } catch (exception) {
        return {
            status: false,
            message: `An error occured while getting list of notes: ${exception.message}`
        }
    }
}

module.exports = getBoard