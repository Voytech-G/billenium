const ColumnHandler = require('../../handler/ColumnHandler')
const mongoose = require("mongoose")

const ColumnSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: [true, 'Column name is required'] },
  board_index: { type: Number, required: [true, 'Column board index is required'] }, // place in board (from left to right) of the column
  tasks: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  ],
  max_tasks: { type: Number, required: [true, 'Column max number of tasks is required'], default: 3 },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // project to which the column is assigned
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

ColumnSchema.post('remove', async column => {
  ColumnHandler.handleColumnRemoved(column)
})

module.exports = mongoose.model("Column", ColumnSchema);
