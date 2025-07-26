const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Announcement = require('../models/Announcement');
const User = require('../models/User');

// @route   POST api/announcements
// @desc    Create a new announcement
// @access  Private (Admin only)
router.post('/', [
  auth,
  check('title', 'Title is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('startDate', 'Start date is required').not().isEmpty(),
  check('endDate', 'End date is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      title,
      content,
      category,
      priority,
      startDate,
      endDate,
      attachments = []
    } = req.body;

    // Check if user is admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const announcement = new Announcement({
      title,
      content,
      category,
      priority,
      startDate,
      endDate,
      attachments,
      publishedBy: req.user.id
    });

    await announcement.save();
    res.json(announcement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/announcements
// @desc    Get all announcements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('publishedBy', ['name', 'email']);
    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/announcements/:id
// @desc    Get announcement by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('publishedBy', ['name', 'email']);

    if (!announcement) {
      return res.status(404).json({ msg: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Announcement not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/announcements/:id
// @desc    Update announcement
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      priority,
      startDate,
      endDate,
      attachments,
      status
    } = req.body;

    const announcementFields = {};
    if (title) announcementFields.title = title;
    if (content) announcementFields.content = content;
    if (category) announcementFields.category = category;
    if (priority) announcementFields.priority = priority;
    if (startDate) announcementFields.startDate = startDate;
    if (endDate) announcementFields.endDate = endDate;
    if (attachments) announcementFields.attachments = attachments;
    if (status) announcementFields.status = status;

    let announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ msg: 'Announcement not found' });
    }

    // Check if user is admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { $set: announcementFields },
      { new: true }
    );

    res.json(announcement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/announcements/:id
// @desc    Delete announcement
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ msg: 'Announcement not found' });
    }

    // Check if user is admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await announcement.remove();
    res.json({ msg: 'Announcement removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
