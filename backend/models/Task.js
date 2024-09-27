const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }, // Reference to the project
  volunteer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the volunteer assigned
  description: { type: String, required: true }, // Task description
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  estimatedHours: { type: Number, required: true, min: 0 }, // Estimated hours for task completion
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
