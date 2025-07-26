const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const LostFound = require('../models/LostFound');
const User = require('../models/User');

// @route   POST api/lost-found
// @desc    Create a new lost/found item
// @access  Private
router.post('/', [
  auth,
  check('type', 'Type is required').not().isEmpty(),
  check('item.name', 'Item name is required').not().isEmpty(),
  check('item.description', 'Item description is required').not().isEmpty(),
  check('item.category', 'Item category is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      type,
      item,
      location,
      images = [],
      contactInfo = {}
    } = req.body;

    const lostFound = new LostFound({
      type,
      item,
      location: {
        type: 'Point',
        coordinates: location
      },
      images,
      contactInfo,
      reportedBy: req.user.id
    });

    await lostFound.save();
    res.json(lostFound);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/lost-found
// @desc    Get all lost/found items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await LostFound.find()
      .populate('reportedBy', ['name', 'email']);
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/lost-found/:id
// @desc    Get lost/found item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id)
      .populate('reportedBy', ['name', 'email']);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/lost-found/:id
// @desc    Update lost/found item
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      type,
      item,
      location,
      images,
      contactInfo,
      status
    } = req.body;

    const lostFoundFields = {};
    if (type) lostFoundFields.type = type;
    if (item) lostFoundFields.item = item;
    if (location) lostFoundFields.location = location;
    if (images) lostFoundFields.images = images;
    if (contactInfo) lostFoundFields.contactInfo = contactInfo;
    if (status) lostFoundFields.status = status;

    let item = await LostFound.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Make sure user is either admin or the reporter
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin' && item.reportedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    item = await LostFound.findByIdAndUpdate(
      req.params.id,
      { $set: lostFoundFields },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/lost-found/:id
// @desc    Delete lost/found item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Make sure user is either admin or the reporter
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin' && item.reportedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await item.remove();
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
