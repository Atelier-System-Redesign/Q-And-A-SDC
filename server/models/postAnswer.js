/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const { createClient } = require('redis');
const createDBClient = require('../../db/database.js');

module.exports = async (questionId, body, date, name, email, reported, helpful, photos) => {
  const client = createDBClient();
  const redisClient = createClient();
  try {
    const cacheKey = `${questionId}-${body}-${name}`;
    const answerQuery = 'INSERT INTO answers (answer_id, question_id, body, date, answerer_name, answerer_email, answer_reported, helpfulness) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7)RETURNING answer_id';
    const answerValues = [questionId, body, date, name, email, reported, helpful];

    await client.connect();
    const { rows: [{ answer_id }] } = await client.query(answerQuery, answerValues);
    const photoQuery = 'INSERT INTO photos (photo_id, answer_id, photo_url) VALUES (uuid_generate_v4(), $1, $2)';
    for (const url of photos) {
      await client.query(photoQuery, [answer_id, url]);
    }

    const newAnswer = { success: true, message: 'Answer posted successfully!' };
    await redisClient.connect();
    await redisClient.set(cacheKey, JSON.stringify(newAnswer));
    const cachedAnswer = await redisClient.get(cacheKey);
    return cachedAnswer ? JSON.parse(cachedAnswer) : newAnswer;
  } catch (error) {
    console.error('Error posting question: ', error);
    throw error;
  } finally {
    client.end();
    redisClient.quit();
  }
};
