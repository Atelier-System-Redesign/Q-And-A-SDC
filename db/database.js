/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const { Client } = require('pg');

function createClient() {
  return new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.PORT,
    database: process.env.DB_NAME,
  });
}

module.exports = createClient;
