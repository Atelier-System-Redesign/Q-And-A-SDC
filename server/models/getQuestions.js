/* eslint-disable no-console */
const db = require('../db/database.js');

module.exports = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const query = `
      SELECT
        q.question_id,
        q.question_body,
        q.question_date,
        q.asker_name,
        q.question_helpfulness,
        q.reported,
        JSON_OBJECTAGG(a.answer_id, JSON_OBJECT(
          'id', a.answer_id,
          'body', a.body,
          'date', a.date,
          'answerer_name', a.answerer_name,
          'helpfulness', a.helpfulness,
          'photos', JSON_ARRAYAGG(p.photo_url)
        )) AS answers
      FROM questions q
      LEFT JOIN answers a ON q.question_id = a.question_id
      LEFT JOIN photos p ON a.answer_id = p.answer_id
      WHERE q.product_id = ?
      GROUP BY q.question_id;
    `;
    const [rows] = await db.promise().query(query, [productId]);
    const formattedData = rows.map((row) => ({
      question_id: row.question_id,
      question_body: row.question_body,
      question_date: row.question_date.toISOString(),
      asker_name: row.asker_name,
      question_helpfulness: row.question_helpfulness,
      reported: row.reported === 1,
      answers: row.answers ? JSON.parse(row.answers) : {},
    }));

    const responseObject = {
      product_id: productId,
      results: formattedData,
    };

    res.json(responseObject);
  } catch (error) {
    console.error('Error retrieving questions: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
