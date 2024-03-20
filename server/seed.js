/* eslint-disable import/no-extraneous-dependencies */
// connect to mysql
require('dotenv').config();
const mysql = require('mysql2');
const { formatDateTime } = require('./helpers/dateTimeUtils');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect();

for (let i = 0; i <= 100; i += 1) {
  const seedProduct = {
    product_id: 4000 + i,
  };

  const seedQuestion = {
    question_id: 30 + i,
    product_id: 4000 + i,
    question_body: 'Does this come in more than one color?',
    question_date: formatDateTime('2018-10-18T00:00:00.000Z'),
    asker_name: 'williamsmith',
    question_helpfulness: 4,
    reported: 0,
  };

  const seedAnswer = {
    answer_id: 70 + i,
    question_id: 30 + i,
    body: 'Yes it comes in black, blue, sage green, red, and goldenrod.',
    date: formatDateTime('2018-10-18T00:00:00.000Z'),
    answerer_name: 'sillyguy',
    helpfulness: 6,
    answer_reported: 0,
  };

  const seedPhoto = {
    photo_id: i,
    answer_id: 70 + i,
    photo_url: 'urlplaceholder/answer_5_photo_number_1.jpg',
  };

  connection.query('INSERT INTO products SET ?', seedProduct, (error) => {
    if (error) throw error;
  });

  connection.query('INSERT INTO questions SET ?', seedQuestion, (error) => {
    if (error) throw error;
  });

  connection.query('INSERT INTO answers SET ?', seedAnswer, (error) => {
    if (error) throw error;
  });

  connection.query('INSERT INTO photos SET ?', seedPhoto, (error) => {
    if (error) throw error;
  });
}
