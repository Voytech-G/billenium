const mongoose = require("mongoose");
const TaskRepository = require('../repository/TaskRepository')

const ColumnSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  board_index: { type: Number, required: true }, // place in board (from left to right) of the column
  tasks: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  ],
  // project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' } // project to which the column is assigned
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

// ColumnSchema.pre('remove', async next => {
//   const filter = {
//     column: this._id,
//   }

//   await TaskRepository.findManyByFilterAndRemove(filter)
//   next()
// })

module.exports = mongoose.model("Column", ColumnSchema);
