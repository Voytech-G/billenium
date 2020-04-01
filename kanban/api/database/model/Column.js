const mongoose = require("mongoose");
const Task = require('../model/Task')

const ColumnSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  board_index: { type: Number, required: true }, // place in board (from left to right) of the column
  tasks: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  ],
  max_tasks: { type: Number, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // project to which the column is assigned
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

ColumnSchema.post('remove', async column => {
  const columnId = column.id

  const filter = {
    column: columnId,
  }

  const tasks = await Task.find(filter)

  tasks.forEach(task => {
    task.remove()
  })
})

module.exports = mongoose.model("Column", ColumnSchema);
