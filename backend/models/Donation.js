const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create a nested schema for customer details
const payeeDetailsSchema = new Schema({
  address: {
    city: { type: String },
    country: { type: String },
    line1: { type: String },
    line2: { type: String, required: false },
    postal_code: { type: String },
    state: { type: String, required: false }
  },
  email: { type: String },
  name: { type: String },
  phone: { type: String }
}, { _id: false });

const donationSchema = new Schema({
  amount: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentId: { type: String, unique: true }, // Stripe Payment ID
  anonymous: { type: Boolean, default: false }, // Option for anonymous donations,
  payee: payeeDetailsSchema,
}, { timestamps: true });


const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation

