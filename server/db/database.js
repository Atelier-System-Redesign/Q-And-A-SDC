/* eslint-disable import/no-extraneous-dependencies */
// connect to mysql
// require('dotenv').config();
// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// connection.connect();

// module.exports = connection;

require('dotenv').config();
const { Client } = require('pg');

const createTablesQuery = `
  CREATE TABLE questions (
    question_id INT PRIMARY KEY,
    product_id INT,
    question_body TEXT,
    question_date TIMESTAMP,
    asker_name VARCHAR(255),
    question_helpfulness INT,
    reported BOOLEAN
  );

  CREATE TABLE answers (
    answer_id INT PRIMARY KEY,
    question_id INT,
    body TEXT,
    date TIMESTAMP,
    answerer_name VARCHAR(255),
    helpfulness INT,
    answer_reported BOOLEAN,
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
  );

  CREATE TABLE photos (
    photo_id BIGINT PRIMARY KEY,
    answer_id INT,
    photo_url TEXT,
    FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
  );

  CREATE INDEX idx_product_id ON questions (product_id);
  CREATE INDEX idx_question_id ON answers (question_id);
`;

const client = new Client({
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.PORT,
  database: process.env.DB_NAME,
});

client.connect()
  .then(() => {
    client.query('DROP TABLE IF EXISTS photos');
  })
  .then(() => {
    client.query('DROP TABLE IF EXISTS answers');
  })
  .then(() => {
    client.query('DROP TABLE IF EXISTS questions');
  })
  .then(() => {
    console.log('Connected to PostgreSQL server');
    return client.query(createTablesQuery);
  })
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch((error) => {
    console.error('Error creating tables: ', error);
  })
  .finally(() => {
    client.end();
  });
