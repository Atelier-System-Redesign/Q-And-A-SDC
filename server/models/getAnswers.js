/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const NodeCache = require('node-cache');
const createClient = require('../../db/database.js');

const cache = new NodeCache();

const getAnswersFromDB = async (questionId, page, count) => {
  const client = createClient();
  try {
    const query = {
      text: `SELECT
        a.answer_id,
        a.body,
        a.date,
        a.answerer_name,
        a.answer_reported,
        a.helpfulness,
        json_agg(json_build_object ('id', p.photo_id, 'url', p.photo_url)) AS photos
      FROM
        answers AS a
      LEFT JOIN
        photos AS p ON a.answer_id = p.answer_id
      WHERE
        a.question_id = $1
      GROUP BY
        a.answer_id
      `,
      values: [questionId],
    };
    await client.connect();
    const result = await client.query(query);
    const formattedData = await result.rows
      .filter((row) => !row.answer_reported)
      .map((row) => ({
        answer_id: row.answer_id,
        body: row.body,
        date: row.date,
        answerer_name: row.answerer_name,
        helpfulness: row.helpfulness,
        photos: row.photos,
      }));
    const responseObject = {
      question: questionId,
      page,
      count,
      results: formattedData,
    };
    return responseObject;
  } catch (error) {
    console.error('Error retrieving questions: ', error);
    throw error;
  } finally {
    client.end();
  }
};

module.exports = async (questionId, page, count) => {
  const cacheKey = `answers_${questionId}`;
  let answers = cache.get(cacheKey);

  if (!answers) {
    answers = await getAnswersFromDB(questionId, page, count);
    cache.set(cacheKey, answers, 3600);
  }
  return answers;
};
