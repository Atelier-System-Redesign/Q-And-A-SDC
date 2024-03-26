/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const createClient = require('../../db/database.js');

module.exports = async (questionId, body, date, name, email, reported, helpful, photos) => {
  const client = createClient();
  try {
    const answerQuery = 'INSERT INTO answers (answer_id, question_id, body, date, answerer_name, answerer_email, answer_reported, helpfulness) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7)RETURNING answer_id';
    const answerValues = [questionId, body, date, name, email, reported, helpful];

    await client.connect();
    const { rows: [{ answer_id }] } = await client.query(answerQuery, answerValues);
    const photoQuery = 'INSERT INTO photos (photo_id, answer_id, photo_url) VALUES (uuid_generate_v4(), $1, $2)';
    for (const url of photos) {
      await client.query(photoQuery, [answer_id, url]);
    }

    return { success: true, message: 'Answer posted successfully!' };
  } catch (error) {
    console.error('Error posting question: ', error);
    throw error;
  } finally {
    client.end();
  }
};
