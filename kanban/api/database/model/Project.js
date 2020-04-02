const ProjectHandler = require('../../handler/ProjectHandler')
const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  project_name: { type: String, required: true },
  used_budget: { type: Number, required: false, default: 0 },
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

ProjectSchema.post('remove', async project => {
  ProjectHandler.handleProjectRemoved(project)
})

module.exports = mongoose.model("Project", ProjectSchema);
