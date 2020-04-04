const mongoose = require("mongoose");
const TaskHandler = require('../../handler/TaskHandler')

const TaskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  content: { type: String, required: [true, 'Task content is required'] },
  row_index: { type: Number, required: [true, 'Task row index is required'] }, // row in which task is placed in specific column
  column: { type: mongoose.Schema.Types.ObjectId, ref: 'Column', required: [true, 'Task column is required'] },
  // users: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // many to one relationship with user model
  // ],
  // subtasks: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' },
  // ],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

TaskSchema.post('remove', async task => {
  TaskHandler.handleTaskRemoved(task)
})

module.exports = mongoose.model("Task", TaskSchema);
