/* eslint-disable no-console */
const createClient = require('../../db/database.js');

module.exports = async (questionId) => {
  const client = createClient();
  try {
    const query = `
      UPDATE questions
      SET question_helpfulness = question_helpfulness + 1
      WHERE question_id = $1`;
    const values = [questionId];

    await client.connect();
    await client.query(query, values);
    return { success: true, message: 'Question helpfulness increased successfully!' };
  } catch (error) {
    console.error('Error increasing helpfulness: ', error);
    throw error;
  } finally {
    client.end();
  }
};
