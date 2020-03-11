const Note = require("../database/models/Note");
const Column = require("../database/models/Column");
const validateGetAllColumnsResponse = require("../validation/column/response/getAllResponse");
const validateGetAllNotesResponse = require("../validation/note/response/getAllResponse");

const getBoard = async () => {
  try {
    let columns = await Column.find({});
    let notes = await Note.find({});

    validateGetAllColumnsResponse(columns);
    validateGetAllNotesResponse(notes);

    return {
      status: true,
      payload: {
        columns,
        notes
      }
    };
  } catch (exception) {
    return {
      status: false,
      message: `An error occured while getting list of notes: ${exception.message}`
    };
  }
};

module.exports = getBoard;
