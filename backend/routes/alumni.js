const express = require('express');
const router = express.Router();
const Alumni = require('../models/Other/alumni');

// Create alumni
router.post('/addAlumni', async (req, res) => {
  try {
    const alumni = new Alumni(req.body);
    const savedAlumni = await alumni.save();
    res.status(201).json(savedAlumni);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all alumni
router.get('/getAlumni', async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get alumni by ID
router.get('/getAlumni/:id', getAlumni, (req, res) => {
  res.json(res.alumni);
});

// Update alumni by ID
router.patch('/updateAlumni/:id', getAlumni, async (req, res) => {
  if (req.body.name != null) {
    res.alumni.name = req.body.name;
  }
  if (req.body.linkedinURL != null) {
    res.alumni.linkedinURL = req.body.linkedinURL;
  }
  if (req.body.phoneNumber != null) {
    res.alumni.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.currentCompany != null) {
    res.alumni.currentCompany = req.body.currentCompany;
  }
  try {
    const updatedAlumni = await res.alumni.save();
    res.json(updatedAlumni);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete alumni by ID
router.delete('/deleteAlumni/:id', getAlumni, async (req, res) => {
  try {
    await res.alumni.remove();
    res.json({ message: 'Alumni deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getAlumni(req, res, next) {
  try {
    alumni = await Alumni.findById(req.params.id);
    if (alumni == null) {
      return res.status(404).json({ message: 'Alumni not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.alumni = alumni;
  next();
}

module.exports = router;
