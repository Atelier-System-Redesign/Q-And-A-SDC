/* eslint-disable no-console */
const createClient = require('../../db/database.js');

module.exports = async (answerId) => {
  const client = createClient();
  try {
    const query = `
      UPDATE answers
      SET helpfulness = helpfulness + 1
      WHERE answer_id = $1`;
    const values = [answerId];

    await client.connect();
    await client.query(query, values);
    return { success: true, message: 'Answer helpfulness increased successfully!' };
  } catch (error) {
    console.error('Error increasing helpfulness: ', error);
    throw error;
  } finally {
    client.end();
  }
};
