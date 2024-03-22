/* eslint-disable no-console */
const createClient = require('../../db/database.js');

module.exports = async (answerId) => {
  const client = createClient();
  try {
    const query = `
      UPDATE answers
      SET answer_reported = NOT answer_reported
      WHERE answer_id = $1`;
    const values = [answerId];

    await client.connect();
    await client.query(query, values);
    return { success: true, message: 'Answer reported or un-reported successfully!' };
  } catch (error) {
    console.error('Error flipping reported status: ', error);
    throw error;
  } finally {
    client.end();
  }
};
