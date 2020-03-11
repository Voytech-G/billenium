const noteConfig = require("../../../config/note");

const validateDeleteNote = noteId => {
  if (noteId == null) {
    throw new Error("Note ID is required");
  }

  if (noteId.length !== noteConfig.idLength) {
    throw new Error("Note ID is invalid");
  }
};

module.exports = validateDeleteNote;
