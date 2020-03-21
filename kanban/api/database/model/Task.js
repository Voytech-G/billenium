const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  content: { type: String, required: true },
  row_index: { type: Number, required: true }, // row in which task is placed in specific column
  column: { type: mongoose.Schema.Types.ObjectId, ref: 'Column', required: true },
  // users: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // many to one relationship with user model
  // ],
  // subtasks: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' },
  // ],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model("Task", TaskSchema);
