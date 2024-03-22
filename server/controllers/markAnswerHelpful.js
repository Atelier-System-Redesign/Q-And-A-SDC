/* eslint-disable camelcase */
/* eslint-disable no-console */
const { markAnswerHelpful } = require('../models');

module.exports = async (req, res) => {
  try {
    const { answer_id } = req.params;
    await markAnswerHelpful(answer_id);
    res.status(200).json({ success: true, message: 'Answer helpfulness increased successfully!' });
  } catch (error) {
    console.error('Error retrieving questions: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
