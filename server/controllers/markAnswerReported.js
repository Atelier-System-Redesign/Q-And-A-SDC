/* eslint-disable camelcase */
/* eslint-disable no-console */
const { markAnswerReported } = require('../models');

module.exports = async (req, res) => {
  try {
    const { answer_id } = req.params;
    await markAnswerReported(answer_id);
    res.status(200).json({ success: true, message: 'Answer reported or un-reported successfully!' });
  } catch (error) {
    console.error('Error reporting answers: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
