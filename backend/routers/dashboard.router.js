// src/routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { verifyToken, adminOnly } = require('../middlewares/access-control.middleware');
const Donation = require('../models/Donation');
const User = require('../models/User');
const { volunteerDashboard } = require('../services/dashboard.service');


// Get all donations
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = req.body.api_user
    if (user.user.role === 'volunteer') {
      await volunteerDashboard(req, res, user.user)
      return
    }

    // Get the total number of projects
    const projects = await Project.countDocuments();

    // Aggregate the total amount of donations
    const totalDonationsResult = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalDonations = totalDonationsResult.length > 0 ? totalDonationsResult[0].total : 0;

    // Get the total number of users
    const totalUsers = await User.countDocuments();

    // Get the total number of volunteers
    const totalVolunteers = await User.countDocuments({ role: 'volunteer' });

    // Use aggregation to get the latest 10 ongoing projects (currentAmount < goalAmount)
    const ongoingProjects = await Project.aggregate([
      {
        $match: {
          $expr: { $lt: ["$currentAmount", "$goalAmount"] }
        }
      },
      {
        $sort: { createdAt: -1 } // Sort by most recent projects (createdAt descending)
      },
      {
        $limit: 10 // Limit the result to 10 projects
      }
    ]);

    // Step 1: Get the top 10 donations based on the most recent donations
    const recentDonations = await Donation.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(10)
      .populate('user', 'name') // Populate user information
      .populate('project', 'title'); // Populate project information

    // Step 2: Get the top 10 recent projects (e.g., newly created projects)
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(10);

    // Step 3: Get the top 10 new users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(10);

    // Step 4: Combine activities from donations, projects, and users into a unified activity list
    const activities = [];

    // Add donation activities
    recentDonations.forEach((donation) => {
      activities.push({
        type: 'donation',
        message: `New Donation: £${donation.amount} by ${donation.user?.name || 'Anonymous'} to project ${donation.project?.title || 'Unknown'}`,
        createdAt: donation.createdAt
      });
    });

    // Add project activities
    recentProjects.forEach((project) => {
      activities.push({
        type: 'project',
        message: `New Project: ${project.title}`,
        createdAt: project.createdAt
      });
    });

    // Add user activities
    recentUsers.forEach((user) => {
      activities.push({
        type: 'user',
        message: `New User: ${user.name}`,
        createdAt: user.createdAt
      });
    });

    // Sort activities by the most recent
    activities.sort((a, b) => b.createdAt - a.createdAt);

    // Limit to the top 10 activities
    const topActivities = activities.slice(0, 10);

    // Send the results as a JSON response
    res.json({
      projects,
      totalDonations,
      totalUsers,
      totalVolunteers,
      ongoingProjects, // Send the filtered ongoing projects list
      topActivities // Send the top 10 activities list
    });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
