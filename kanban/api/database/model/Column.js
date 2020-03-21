const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  board_index: { type: Number, required: true }, // place in board (from left to right) of the column
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model("Column", ColumnSchema);
