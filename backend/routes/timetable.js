const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Timetable = require('../models/Timetable');

// @route   POST api/timetable
// @desc    Create a new timetable
// @access  Private (Admin only)
router.post('/', [
  auth,
  check('courseCode', 'Course code is required').not().isEmpty(),
  check('courseName', 'Course name is required').not().isEmpty(),
  check('semester', 'Semester is required').not().isEmpty(),
  check('academicYear', 'Academic year is required').not().isEmpty(),
  check('schedule', 'Schedule is required').isArray()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      courseCode,
      courseName,
      semester,
      academicYear,
      schedule
    } = req.body;

    const timetable = new Timetable({
      courseCode,
      courseName,
      semester,
      academicYear,
      schedule
    });

    await timetable.save();
    res.json(timetable);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/timetable
// @desc    Get all timetables
// @access  Public
router.get('/', async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json(timetables);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/timetable/:courseCode
// @desc    Get timetable by course code
// @access  Public
router.get('/:courseCode', async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ courseCode: req.params.courseCode });

    if (!timetable) {
      return res.status(404).json({ msg: 'Timetable not found' });
    }

    res.json(timetable);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/timetable/:courseCode
// @desc    Update timetable
// @access  Private (Admin only)
router.put('/:courseCode', auth, async (req, res) => {
  try {
    const {
      courseName,
      semester,
      academicYear,
      schedule
    } = req.body;

    const timetableFields = {};
    if (courseName) timetableFields.courseName = courseName;
    if (semester) timetableFields.semester = semester;
    if (academicYear) timetableFields.academicYear = academicYear;
    if (schedule) timetableFields.schedule = schedule;

    let timetable = await Timetable.findOne({ courseCode: req.params.courseCode });

    if (!timetable) {
      return res.status(404).json({ msg: 'Timetable not found' });
    }

    timetable = await Timetable.findOneAndUpdate(
      { courseCode: req.params.courseCode },
      { $set: timetableFields },
      { new: true }
    );

    res.json(timetable);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/timetable/:courseCode
// @desc    Delete timetable
// @access  Private (Admin only)
router.delete('/:courseCode', auth, async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ courseCode: req.params.courseCode });

    if (!timetable) {
      return res.status(404).json({ msg: 'Timetable not found' });
    }

    await timetable.remove();
    res.json({ msg: 'Timetable removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
