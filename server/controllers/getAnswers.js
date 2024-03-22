/* eslint-disable camelcase */
/* eslint-disable no-console */
const { getAnswers } = require('../models');

module.exports = async (req, res) => {
  try {
    const { page, count } = req.query;
    const questionId = parseInt(req.params.question_id, 10);
    const pageNum = parseInt(page, 10);
    const countNum = parseInt(count, 10);
    const answers = await getAnswers(questionId, pageNum, countNum);
    res.status(200).send(answers);
  } catch (error) {
    console.error('Error retrieving questions: ', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
