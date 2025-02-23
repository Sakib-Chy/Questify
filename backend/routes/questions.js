const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Question = require('../models/Question');

// Create a question
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const question = new Question({ title, description, user: req.user.id });
    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().populate('user', 'username');
    res.json(questions);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
