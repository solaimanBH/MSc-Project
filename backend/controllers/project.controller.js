const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");
const crypto = require('crypto')

exports.create = async (req, res) => {
  try {
    const { gallery } = req.body

    const payload = { ...req.body }
    payload.coverImage.imageID = crypto.randomUUID()

    payload.gallery = gallery.map(image => {
      return {
        ...image,
        imageID: crypto.randomUUID()
      }
    });

    const project = new Project(payload);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error(err);

    res.status(400).json({ message: err.message });
  }
}

exports.getAll = async (req, res) => {
  try {
    const status = req.query.status;
    const query = status ? { status } : {};
    const projects = await Project.find(query).populate('volunteers');
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('volunteers', 'name email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update a project
exports.update = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getListByCategory = async (req, res) => {
  try {
    const projects = await Project.find({ category: req.params.category });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getListByTags = async (req, res) => {
  try {
    const tags = req.query.tags ? req.query.tags.split(',') : [];
    const projects = await Project.find({ tags: { $in: tags } });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.updateFunds = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.currentAmount += req.body.amount;
    const updatedProject = await project.save();

    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.assignVolunteer = async (req, res) => {
  try {
    const { projectId, volunteerId } = req.body;

    // Find the project by ID
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Check if the volunteer exists and has the correct role
    const volunteer = await User.findById(volunteerId);
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
    if (volunteer.role !== 'volunteer') return res.status(400).json({ message: 'User is not a volunteer' });

    // Add the volunteer to the project if not already assigned
    if (!project.volunteers.includes(volunteer._id)) {
      await Project.findByIdAndUpdate(
        projectId,
        { $addToSet: { volunteers: volunteer._id } }, // $addToSet ensures no duplicates
        { new: true }
      );
    }

    // Optionally, also add the project to the volunteer's project list (if needed)
    if (!volunteer.projects.includes(projectId)) {
      await User.findByIdAndUpdate(
        volunteerId,
        { $addToSet: { projects: projectId } },
        { new: true }
      );
    }

    // Return the updated project with the new volunteer
    const updatedProject = await Project.findById(projectId).populate('volunteers', 'name email');
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.params.userId });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Project-specific tasks
exports.getTasksOfProject = async (req, res) => {
  const id = req.params.id

  const tasks = await Task.find({ project: id }).populate({ path: 'volunteer', select: '_id name email' })

  console.log(tasks);


  res.json(tasks)
}