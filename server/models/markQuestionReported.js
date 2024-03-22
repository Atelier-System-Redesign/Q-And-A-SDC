/* eslint-disable no-console */
const createClient = require('../../db/database.js');

module.exports = async (questionId) => {
  const client = createClient();
  try {
    const query = `
      UPDATE questions
      SET reported = NOT reported
      WHERE question_id = $1`;
    const values = [questionId];

    await client.connect();
    await client.query(query, values);
    return { success: true, message: 'Question reported or un-reported successfully!' };
  } catch (error) {
    console.error('Error flipping reported status: ', error);
    throw error;
  } finally {
    client.end();
  }
};
