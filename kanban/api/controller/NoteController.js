const mongoose = require("mongoose");
const NoteValidator = require("../validation/note/NoteValidator");
const NoteRepository = require("../database/repository/NoteRepository");

class NoteController {
  /**
   * Create a new note
   *
   * @param {Object} payload
   * @param {Function} callback
   * @return void
   */
  static async create(payload, callback) {
    try {
      NoteValidator.validateCreateRequest(payload);

      const content = payload.content;
      const rowIndex = payload.row_index;
      const columnId = payload.column_id;

      let note = await NoteRepository.create(content, rowIndex, columnId);

      NoteValidator.validateCreateResponse(note);

      callback({
        status: true,
        message: "Successfully created a new note",
        payload: note
      });

      return;
    } catch (exception) {
      callback({
        status: false,
        message: `Failed to create a new note: ${exception.message}`
      });

      return;
    }
  }

  /**
   * Move note to another position, add 1 to row index of all notes above
   *
   * @param {Object} payload
   * @param {Function} callback
   * @return void
   */
  static async move(payload, callback) {
    try {
      NoteValidator.validateMoveRequest(payload);

      const noteId = payload.note_id;

      const targetRowIndex = payload.target_row_index;
      const targetColumnId = payload.target_column_id;

      const sourceRowIndex = payload.source_row_index;
      const sourceColumnId = payload.source_column_id;

      await this.moveNotesAboveRowIndexDown(sourceRowIndex, sourceColumnId);
      await this.moveNotesAboveRowIndexUp(targetRowIndex, targetColumnId, true);

      const filter = {
        _id: noteId
      };

      const update = {
        row_index: targetRowIndex,
        column_id: targetColumnId
      };

      // update moved note's position to target note position
      let updatedNote = await NoteRepository.findOneByFilterAndUpdate(
        filter,
        update
      );

      NoteValidator.validateUpdateResponse(updatedNote);

      callback({
        status: true,
        message: "Successfully moved the note"
      });

      return;
    } catch (exception) {
      callback({
        status: false,
        message: `Failed to move the note: ${exception.message}`
      });

      return;
    }
  }

  /**
   * Move all notes above row index down (select if includes given row index's note)
   *
   * @param {Number} sourceRowIndex
   * @param {String} sourceColumnId
   * @param {Boolean} including
   */
  static async moveNotesAboveRowIndexDown(
    sourceRowIndex,
    sourceColumnId,
    including = false
  ) {
    let filter = {
      row_index: { $gt: sourceRowIndex },
      column_id: sourceColumnId
    };

    // if including flag is true update also the note at given row index, else only the ones above
    filter.row_index =
      including == true ? { $gte: sourceRowIndex } : { $gt: sourceRowIndex };

    const update = {
      $inc: { row_index: -1 }
    };

    let response = await NoteRepository.findManyByFilterAndUpdate(
      filter,
      update
    );

    NoteValidator.validateMoveResponse(response);

    return;
  }

  /**
   * Move all notes above given row index up (select if includes given row index's note)
   *
   * @param {Number} targetRowIndex
   * @param {String} targetColumnId
   * @param {Boolean} including
   */
  static async moveNotesAboveRowIndexUp(
    targetRowIndex,
    targetColumnId,
    including = false
  ) {
    let filter = {
      column_id: targetColumnId
    };

    // if including flag is true update also the note at given row index, else only the ones above
    filter.row_index =
      including == true ? { $gte: targetRowIndex } : { $gt: targetRowIndex };

    const update = {
      $inc: { row_index: 1 }
    };

    let response = await NoteRepository.findManyByFilterAndUpdate(
      filter,
      update
    );

    NoteValidator.validateMoveResponse(response);

    return;
  }

  /**
   * Update a note
   *
   * @param {Object} payload
   * @param {Function} callback
   * @return void
   */
  static async update(payload, callback) {
    try {
      NoteValidator.validateUpdateRequest(payload);

      const noteId = payload.note_id;
      const content = payload.content;

      const filter = {
        _id: noteId
      };

      const update = {
        content
      };

      let note = await NoteRepository.findOneByFilterAndUpdate(filter, update);

      NoteValidator.validateUpdateResponse(note);

      callback({
        status: true,
        message: "Successfully updated the note",
        payload: note
      });

      return;
    } catch (exception) {
      callback({
        status: false,
        message: `Failed to update the note: ${exception.message}`
      });

      return;
    }
  }

  /**
   * Delete a note
   *
   * @param {Object} payload
   * @param {Function} callback
   * @return void
   */
  static async delete(payload, callback) {
    try {
      NoteValidator.validateDeleteRequest(payload);

      const noteId = payload.note_id;
      const sourceRowIndex = payload.source_row_index;
      const sourceColumnId = payload.source_column_id;

      // after weww delete the note we move all notes above it to fill the created gap
      await this.moveNotesAboveRowIndexDown(sourceRowIndex, sourceColumnId);

      const filter = { _id: noteId };

      let response = await NoteRepository.deleteOneByFilter(filter);

      NoteValidator.validateDeleteResponse(response);

      callback({
        status: true,
        message: `Successfully deleted note of id: ${noteId}`
      });

      return;
    } catch (exception) {
      callback({
        status: false,
        message: `Failed to delete note: ${exception.message}`
      });

      return;
    }
  }
}

module.exports = NoteController;
