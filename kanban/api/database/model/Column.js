const mongoose = require("mongoose");


const ColumnSchema = new mongoose.Schema({

  /** Returns an instance of Column 
   * 
   * @constructor 
   * @param {Schema.Types.ObjectId} _id Uid of note generated automatically by Mongoose, while creating an object
   * @param {String} name Name of column, required
   * @param {Number} board_index Place in board (from left to right) of the column, required
  */

  /** private */ _id: mongoose.Schema.Types.ObjectId,
  /** private */ name: { type: String, required: true },
  /** private */ board_index: { type: Number, required: true }
});

module.exports = mongoose.model("Column", ColumnSchema);
