const Project = require('../models/Project')
const Donation = require('../models/Donation')
const User = require('../models/User')
const { verifyToken, adminOnly } = require('../middlewares/access-control.middleware');

const router = require('express').Router()

router.get('/homepage-data', async (_req, res) => {
  try {
    // Fetch all active projects
    const projects = await Project.find({ status: 'active' }).populate('volunteers', 'name');

    // Calculate total donations by summing the amounts of all completed donations
    const totalDonations = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Get the total number of volunteers
    const volunteerCount = await User.countDocuments({ role: 'volunteer' });

    // Send the response back with the necessary data
    res.json({
      projects,
      totalDonations: totalDonations.length > 0 ? totalDonations[0].total : 0,
      volunteerCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find({}, 'name email role'); // Fetch only necessary fields
    res.json(users);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/users/:id', verifyToken, adminOnly, async (_req, res) => {
  try {
    const users = await User.findByIdAndDelete(_req.params.id)
    return res.json({ success: true })
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;