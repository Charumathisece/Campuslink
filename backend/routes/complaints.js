const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Complaint = require('../models/Complaint');
const User = require('../models/User');

// @route   POST api/complaints
// @desc    Create a new complaint
// @access  Private
router.post('/', [
  auth,
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      title,
      description,
      category,
      location,
      images = [],
      adminFeedback = ''
    } = req.body;

    const complaint = new Complaint({
      title,
      description,
      category,
      location: {
        type: 'Point',
        coordinates: location
      },
      images,
      reportedBy: req.user.id,
      adminFeedback
    });

    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/complaints
// @desc    Get all complaints
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('reportedBy', ['name', 'email'])
      .populate('assignedTo', ['name', 'email']);
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/complaints/:id
// @desc    Get complaint by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('reportedBy', ['name', 'email'])
      .populate('assignedTo', ['name', 'email']);

    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Complaint not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/complaints/:id
// @desc    Update complaint status
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { status, assignedTo, adminFeedback } = req.body;

    const complaintFields = {};
    if (status) complaintFields.status = status;
    if (assignedTo) complaintFields.assignedTo = assignedTo;
    if (adminFeedback) complaintFields.adminFeedback = adminFeedback;

    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }

    // Make sure user is admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { $set: complaintFields },
      { new: true }
    );

    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/complaints/:id
// @desc    Delete complaint
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }

    // Make sure user is admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await complaint.remove();
    res.json({ msg: 'Complaint removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
