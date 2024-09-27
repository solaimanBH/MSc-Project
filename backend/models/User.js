const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'volunteer', 'donor'],
    default: 'donor'
  },
  donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  interests: [{ type: String }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User
