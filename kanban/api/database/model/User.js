const mongoose = require("mongoose")
const userConfig = require('../../config/user')
// const UserHandler = require('../handler/UserHandler')

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: [true, 'Username is required'], unique: [true, 'Username has to be unique'] },
    pin: { type: String, required: [true, 'PIN is required'] },
    first_name: { type: String, required: [true, 'First name is required'] },
    last_name: { type: String, required: [true, 'Last name is required'] },
    user_type: { type: String, enum: userConfig.userTypes, required: [true, 'User type is required'] },
    initials: { type: String, required: [true, 'User initials are required'] },
    max_work_in_progress_tasks: { type: Number, required: false, default: 3 },
    tasks: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    ],
    // teams: [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    // ],
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

// UserSchema.pre('save', next => {
// })

module.exports = mongoose.model("User", UserSchema);
