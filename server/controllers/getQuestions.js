/* eslint-disable no-console */
const { getQuestions } = require('../models');

module.exports = async (req, res) => {
  try {
    const productId = parseInt(req.query.product_id, 10);
    const questions = await getQuestions(productId);
    res.status(200).send(questions);
  } catch (error) {
    console.error('Error retrieving questions: ', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
