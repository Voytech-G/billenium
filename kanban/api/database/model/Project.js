const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  used_budget: { type: Number, required: true, default: 0 },
  total_budget: { type: Number, required: true, default: 0 },
  columns: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Column' },
  ],
//   teams: [
//       { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
//   ],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model("Project", ProjectSchema);
