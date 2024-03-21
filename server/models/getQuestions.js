/* eslint-disable no-console */
const db = require('../../db/database.js');

module.exports = async (productId) => {
  console.log('productId in models: ', productId);
  try {
    const query = `
    WITH answers_list AS (
      SELECT
      a.question_id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', a.answer_id,
          'body', a.body,
          'date', a.date,
          'answerer_name', a.answerer_name,
          'helpfulness', a.helpfulness,
          'photos', photos.photo_urls
        )
      ) AS answers
    FROM answers a
    LEFT JOIN (
      SELECT
        answer_id,
        JSON_ARRAYAGG(photo_url) AS photo_urls
      FROM photos
      GROUP BY answer_id
    ) AS photos ON a.answer_id = photos.answer_id
    GROUP BY a.question_id
    )

    SELECT
    q.question_id,
    q.question_body,
    q.question_date,
    q.asker_name,
    q.question_helpfulness,
    q.reported,
    JSON_OBJECT(
      'answers', q_answers.answers
    ) AS answers
  FROM questions q
  LEFT JOIN answers_list AS q_answers ON q.question_id = q_answers.question_id
  WHERE q.product_id = ?
    `;
    const [rows] = await db.promise().query(query, [productId]);
    const formattedData = rows.map((row) => ({
      question_id: row.question_id,
      question_body: row.question_body,
      question_date: row.question_date.toISOString(),
      asker_name: row.asker_name,
      question_helpfulness: row.question_helpfulness,
      reported: row.reported === 1,
      answers: typeof row.answers === 'string' ? JSON.parse(row.answers) : row.answers,
    }));

    const responseObject = {
      product_id: productId,
      results: formattedData,
    };

    return responseObject;
  } catch (error) {
    console.error('Error retrieving questions: ', error);
    throw error;
  }
};
