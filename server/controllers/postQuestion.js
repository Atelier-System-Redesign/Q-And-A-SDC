/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const { postQuestion } = require('../models');
const { formatDateTime } = require('../helpers/dateTimeUtils.js');

module.exports = async (req, res) => {
  try {
    const {
      product_id,
      question_body,
      asker_name,
      asker_email,
    } = req.body;
    const currentTime = Date.now();
    const formattedTime = formatDateTime(currentTime);
    const reported = 0;
    const helpful = 0;
    const productId = parseInt(product_id, 10);
    await postQuestion(productId, question_body, formattedTime, asker_name, asker_email, reported, helpful);
    res.status(201).send('Question posted successfully!');
  } catch (error) {
    console.error('Error retrieving questions: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
