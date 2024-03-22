/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const { postAnswer } = require('../models');
const { formatDateTime } = require('../helpers/dateTimeUtils.js');

module.exports = async (req, res) => {
  try {
    const {
      body,
      answerer_name,
      answerer_email,
      photos,
    } = req.body;
    const { question_id } = req.params;
    const currentTime = Date.now();
    const formattedTime = formatDateTime(currentTime);
    const reported = 0;
    const helpful = 0;
    const questionId = parseInt(question_id, 10);
    await postAnswer(questionId, body, formattedTime, answerer_name, answerer_email, reported, helpful, photos);
    res.status(201).send('Question answered successfully!');
  } catch (error) {
    console.error('Error retrieving answers: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
