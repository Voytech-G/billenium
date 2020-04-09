const ProjectHandler = require('../handler/ProjectHandler')
const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  project_name: { type: String, required: [true, 'Project name is required'] },
  used_budget: { type: Number, required: false, default: 0 },
  total_budget: { type: Number, required: [true, 'Total budget is required'] },
  columns: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Column' },
  ],
//   teams: [
//       { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
//   ],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

ProjectSchema.post('remove', async project => {
  ProjectHandler.handleProjectRemoved(project)
})

module.exports = mongoose.model("Project", ProjectSchema);
