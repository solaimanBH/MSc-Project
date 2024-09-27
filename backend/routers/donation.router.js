// src/routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Project = require('../models/Project');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { verifyToken } = require('../middlewares/access-control.middleware')

// Create a new donation
router.post('/', async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('user', 'name') // Assuming User model has a 'name' field
      .populate('project', 'title category'); // Assuming Project model has a 'title' field
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// confirm donation
router.get('/confirm/:sessionId', verifyToken, async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Retrieve the session details from Stripe using the sessionId
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Get the authenticated user from the request body
    const user = req.body.api_user;

    // Find the project using the title from session custom fields
    const project = await Project.findOne({ title: session.custom_fields[0].text.value });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Create a new donation document
    const newDonation = new Donation({
      amount: session.amount_subtotal / 100,  // Stripe amounts are in cents, convert to dollars
      user: user.user.id,
      project: project._id,
      paymentStatus: session.payment_status === 'paid' ? 'completed' : 'failed',
      paymentId: session.id,
      payee: session.customer_details
    });

    // Save the donation in the database
    const savedDonation = await newDonation.save();

    // Update the project's currentAmount and add the donation ID to the donations list
    const updatedProject = await Project.findByIdAndUpdate(
      project._id,
      {
        $inc: { currentAmount: savedDonation.amount }, // Increment the currentAmount by the donation amount
        $push: { donations: savedDonation._id } // Add the new donation ID to the donations array
      },
      { new: true } // Return the updated document
    );

    // Check if the update was successful
    if (!updatedProject) {
      return res.status(500).json({ message: 'Failed to update the project with the new donation.' });
    }

    // Respond with the session details and donation confirmation
    res.json({ message: 'Donation successful and project updated', session });
  } catch (err) {
    // Handle errors and return 500 status
    res.status(500).json({ message: err.message });
  }
});



// Get a single donation by ID
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('user', 'name')
      .populate('project', 'title');
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a donation by ID
router.put('/:id', async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.json(donation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a donation by ID
router.delete('/:id', async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.json({ message: 'Donation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
