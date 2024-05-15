const mongoose = require('mongoose');

// Define the alumni schema
const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  linkedinURL: {
    type: String,
    required: true,
    unique: true // Ensures uniqueness of LinkedIn URLs
  },
  phoneNumber: {
    type: String,
    required: true
  },
  currentCompany: {
    type: String,
    required: true
  }
});

// Create the Alumni model
const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;