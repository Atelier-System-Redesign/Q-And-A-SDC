/* eslint-disable camelcase */
/* eslint-disable no-console */
const { markQuestionReported } = require('../models');

module.exports = async (req, res) => {
  try {
    const { question_id } = req.params;
    await markQuestionReported(question_id);
    res.status(200).json({ success: true, message: 'Question reported or un-reported successfully!' });
  } catch (error) {
    console.error('Error retrieving questions: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
