const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// Post an answer
router.post('/:questionId', auth, async (req, res) => {
  const { content } = req.body;
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) return res.status(404).json({ msg: 'Question not found' });

    const answer = new Answer({ content, question: question._id, user: req.user.id });
    await answer.save();
    res.json(answer);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get answers for a question
router.get('/:questionId', async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId }).populate('user', 'username');
    res.json(answers);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
