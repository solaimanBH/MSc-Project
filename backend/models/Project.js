const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  imagePath: { type: String, required: true },
  imageID: { type: String, required: true },
});

const projectSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'education', 'health', etc.
  tags: [{
    type: String,
    required: true,
  }], // Ensures that the tags are unique
  goalAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['active', 'completed', 'inactive'],
    default: 'active'
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Admin/volunteer who created the project
  volunteers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Volunteers working on the project
  donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }], // Donations made to this project
  coverImage: imageSchema, // Cover image for the project
  gallery: [imageSchema], // Array of images for the project gallery
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project 
