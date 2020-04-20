const TaskHandler = require('../handler/TaskHandler')
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  content: { type: String, required: [true, 'Task content is required'] },
  row_index: { type: Number, required: [true, 'Task row index is required'] },
  column: { type: mongoose.Schema.Types.ObjectId, ref: 'Column', nullable: true },
  subproject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subproject', nullable: true, default: null },
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ],
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
