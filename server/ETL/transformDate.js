/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const fs = require('fs');
const fastCsv = require('fast-csv');
// const { Transform, PassThrough } = require('stream');
// const db = require('../db/database.js').promise();
const { formatDateTime } = require('../helpers/dateTimeUtils');

const stream = fs.createReadStream('server/ETL/questions.csv');

const outputStream = fs.createWriteStream('server/ETL/transformed_questions.csv');

let rowCount = 0;

stream.pipe(fastCsv.parse({ headers: true }))
  .on('error', (error) => {
    console.error('Error parsing CSV file: ', error);
  })
  .transform((row, cb) => {
    const originalDate = parseInt(row.date_written, 10);
    const formattedDate = formatDateTime(originalDate);
    row.date_written = formattedDate;
    rowCount += 1;
    console.log(`Formatted ${rowCount} rows`);
    cb(null, row);
  })
  .pipe(fastCsv.format({ headers: true }))
  .on('error', (error) => {
    console.error('Error formatting CSV file: ', error);
  })
  .pipe(outputStream)
  .on('error', (error) => {
    console.error('Error writing transformed CSV file: ', error);
  })
  .on('finish', () => {
    console.log('CSV file transformed successfully');
  });
