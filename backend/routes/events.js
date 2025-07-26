const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const User = require('../models/User');

// @route   POST api/events
// @desc    Create a new event
// @access  Private
router.post('/', [
  auth,
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('startDate', 'Start date is required').not().isEmpty(),
  check('endDate', 'End date is required').not().isEmpty(),
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
      startDate,
      endDate,
      location,
      maxCapacity,
      attendees = []
    } = req.body;

    const event = new Event({
      title,
      description,
      category,
      startDate,
      endDate,
      location: {
        type: 'Point',
        coordinates: location
      },
      organizer: req.user.id,
      maxCapacity,
      attendees
    });

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizer', ['name', 'email'])
      .populate('attendees', ['name', 'email']);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', ['name', 'email'])
      .populate('attendees', ['name', 'email']);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/events/:id
// @desc    Update event
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      startDate,
      endDate,
      location,
      maxCapacity,
      status
    } = req.body;

    const eventFields = {};
    if (title) eventFields.title = title;
    if (description) eventFields.description = description;
    if (category) eventFields.category = category;
    if (startDate) eventFields.startDate = startDate;
    if (endDate) eventFields.endDate = endDate;
    if (location) eventFields.location = location;
    if (maxCapacity) eventFields.maxCapacity = maxCapacity;
    if (status) eventFields.status = status;

    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Make sure user is organizer or admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin' && event.organizer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true }
    );

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/events/:id
// @desc    Delete event
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Make sure user is organizer or admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin' && event.organizer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await event.remove();
    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
