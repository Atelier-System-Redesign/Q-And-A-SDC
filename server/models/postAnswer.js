/* eslint-disable no-console */
const createClient = require('../../db/database.js');

module.exports = async (questionId, body, date, name, email, reported, helpful, photos) => {
  console.log(photos);
  const client = createClient();
  try {
    const query = 'INSERT INTO answers (answer_id, question_id, body, date, answerer_name, answerer_email, answer_reported, helpfulness) VALUES ((SELECT COUNT (DISTINCT answer_id) FROM answers)+1, $1, $2, $3, $4, $5, $6, $7)';
    const values = [questionId, body, date, name, email, reported, helpful];

    await client.connect();
    await client.query(query, values);
    return { success: true, message: 'Answer posted successfully!' };
  } catch (error) {
    console.error('Error posting question: ', error);
    throw error;
  } finally {
    client.end();
  }
};
