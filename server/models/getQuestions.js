/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const NodeCache = require('node-cache');
const createClient = require('../../db/database.js');

const cache = new NodeCache();

const getQuestionsFromDB = async (productId) => {
  const client = createClient();
  try {
    const query = 'SELECT * FROM questions WHERE product_id = $1 AND NOT reported';

    await client.connect();
    const result = await client.query(query, [productId]);

    const responseObject = {
      product_id: productId,
      results: result.rows,
    };

    return responseObject;
  } catch (error) {
    console.error('Error retrieving questions: ', error);
    throw error;
  } finally {
    client.end();
  }
};

module.exports = async (productId) => {
  const cacheKey = `questions_${productId}`;
  let questions = cache.get(cacheKey);

  if (!questions) {
    questions = await getQuestionsFromDB(productId);
    cache.set(cacheKey, questions, 3600);
  }

  return questions;
};
