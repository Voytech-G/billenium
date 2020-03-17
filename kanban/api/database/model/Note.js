const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({

  /** Returns an instance of Note
   * 
   * @constructor
   * @param {Schema.Types.ObjectId} _id Unique ID of note, generated automatically by mongoose, while creaing and object
   * @param {String} content Row in which note is placed in specific column, required
   * @param {Number} row_index Number of place in which note is placed in column, required
   * @param {Schema.Types.ObjectId} column_id Column in which note is placed in project board, required
   */

  /** private */ _id: mongoose.Schema.Types.ObjectId,
  /** private */ content: { type: String, required: true },
  /** private */ row_index: { type: Number, required: true }, 
  /** private */ column_id: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model("Note", NoteSchema);
