/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const createClient = require('../../db/database.js');

module.exports = async (productId, body, date, name, email, reported, helpful) => {
  const client = createClient();
  try {
    const query = 'INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7)';
    const values = [productId, body, date, name, email, reported, helpful];

    await client.connect();
    await client.query(query, values);
    return { success: true, message: 'Question posted successfully!' };
  } catch (error) {
    console.error('Error posting question: ', error);
    throw error;
  } finally {
    client.end();
  }
};
