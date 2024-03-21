/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
require('dotenv').config();
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;
const createClient = require('../../db/database.js');

const path = 'server/ETL/transformed_answers.csv';
const table = 'answers';

async function importDataFromCSV(filePath, tableName) {
  const client = createClient();
  try {
    await client.connect();

    const stream = client.query(copyFrom(`COPY ${tableName} FROM STDIN WITH (FORMAT csv, HEADER)`));

    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', (error) => {
      console.error('Error reading file: ', error);
      client.end();
    });

    stream.on('error', (error) => {
      console.error('Error executing COPY command: ', error);
      client.end();
    });

    stream.on('end', () => {
      console.log(`Data loaded into ${tableName} successfully`);
      client.end();
    });

    fileStream.pipe(stream);
  } catch (error) {
    console.error('Error importing data from CSV: ', error);
    client.end();
  }
}

importDataFromCSV(path, table);
