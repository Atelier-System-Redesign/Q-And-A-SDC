/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const { Client } = require('pg');

const createTablesQuery = `
  CREATE TABLE questions (
    question_id INT PRIMARY KEY,
    product_id INT,
    question_body TEXT,
    question_date TIMESTAMP,
    asker_name VARCHAR(255),
    asker_email VARCHAR(255),
    reported BOOLEAN,
    question_helpfulness INT
  );

  CREATE TABLE answers (
    answer_id INT PRIMARY KEY,
    question_id INT,
    body TEXT,
    date TIMESTAMP,
    answerer_name VARCHAR(255),
    answerer_email VARCHAR(255),
    answer_reported BOOLEAN,
    helpfulness INT,
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
