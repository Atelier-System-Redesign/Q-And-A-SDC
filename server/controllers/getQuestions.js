/* eslint-disable no-console */
const { getQuestions } = require('../models');

module.exports = async (req, res) => {
  console.log('req.query in controllers: ', req.query);
  try {
    const productId = parseInt(req.query.product_id, 10);
    const questions = await getQuestions(productId);
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error retrieving questions: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
