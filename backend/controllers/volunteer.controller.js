const bcrypt = require('bcrypt');
const User = require('../models/User');
const Project = require('../models/Project');

exports.createVolunteer = async (req, res) => {
  const { name, email, password = 'password123', projects } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new volunteer
    const volunteer = new User({
      name,
      email,
      password: hashedPassword,
      role: 'volunteer',
      projects
    });

    const savedVolunteer = await volunteer.save();

    // Loop through each project and add the volunteer to it
    if (projects && projects.length > 0) {
      for (let projectId of projects) {
        await Project.findByIdAndUpdate(
          projectId,
          { $addToSet: { volunteers: savedVolunteer._id } }, // Ensure volunteer is only added once
          { new: true } // Return the updated project
        );
      }
    }

    res.status(201).json(savedVolunteer);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: err.message });
  }
};

exports.getList = async (req, res) => {

  try {
    const volunteers = await User.find({ role: 'volunteer' }).populate('projects')

    res.status(200).json(volunteers);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: err.message });
  }
};
