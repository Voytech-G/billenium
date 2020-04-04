const mongoose = require("mongoose")
const userConfig = require('../../config/user')

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: [true, 'Username is required'], unique: [true, 'Username has to be unique'] },
    pin: { type: String, required: [true, 'PIN is required'], select: false },
    first_name: { type: String, required: [true, 'First name is required'] },
    last_name: { type: String, required: [true, 'Last name is required'] },
    user_type: { type: String, enum: userConfig.userTypes, required: [true, 'User type is required'] }, // type of user, permissions depend on it
    initials: { type: String, required: false }, // first letter of firstname and first letter of lastname concatenated
    // max_work_in_progress_tasks: { type: Number, required: false, default: 3 },
    // teams: [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    // ],
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

// UserSchema.pre('save', next => {
// })

module.exports = mongoose.model("User", UserSchema);
