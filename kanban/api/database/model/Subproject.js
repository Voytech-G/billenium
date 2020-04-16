// const SubprojectHandler = require('../handler/SubprojectHandler')
const mongoose = require("mongoose")

const SubprojectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subproject_name: { type: String, required: [true, 'Subproject name is required'] },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: [true, 'Parent project reference is required'] },
    tasks: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    ],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

// SubprojectSchema.post('remove', async subproject => {
//     SubprojectHandler.handleSubprojectRemoved(subproject)
// })

module.exports = mongoose.model("Subproject", Subproject);
