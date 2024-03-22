/* eslint-disable no-console */
const createClient = require('../../db/database.js');

module.exports = async (productId) => {
  const client = createClient();
  try {
    const query = 'SELECT * FROM questions WHERE product_id = $1';

    await client.connect();
    const result = await client.query(query, [productId]);
    const formattedData = result.rows.map((row) => ({
      question_id: row.question_id,
      question_body: row.question_body,
      question_date: row.question_date,
      asker_name: row.asker_name,
      asker_email: row.asker_email,
      question_helpfulness: row.question_helpfulness,
      reported: row.reported === 1,
    }));

    const responseObject = {
      product_id: productId,
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
