/* eslint-disable no-console */
const fs = require('fs');
const fastCsv = require('fast-csv');
const { Transform, PassThrough } = require('stream');
const db = require('../db/database.js').promise();
const { formatDateTime } = require('../helpers/dateTimeUtils');

const csvFilePath = 'server/ETL/questions.csv';

// Define batch size for database insertion
const batchSize = 1000; // Adjust as needed

// Transform stream to process each CSV row
const transformStream = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    try {
      const row = {
        id: parseInt(chunk.id),
        product_id: parseInt(chunk.product_id),
        body: chunk.body,
        date_written: parseInt(chunk.date_written),
        asker_name: chunk.asker_name,
        reported: parseInt(chunk.reported),
        helpful: parseInt(chunk.helpful),
      };
      callback(null, row);
    } catch (error) {
      callback(error);
    }
  },
});

// Function to process a batch of rows and insert into the database
async function processBatch(batch) {
  const values = batch.map((row) => [
    row.id,
    row.product_id,
    row.body,
    formatDateTime(row.date_written),
    row.asker_name,
    row.reported,
    row.helpful,
  ]);
  await db.query('INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, reported, question_helpfulness) VALUES ?', [values]);
}

// Read CSV file as stream, pipe through CSV parser and transform stream
fs.createReadStream(csvFilePath)
  .pipe(fastCsv.parse({ headers: true }))
  .pipe(transformStream)
  .on('error', (error) => {
    console.error('Error processing CSV file: ', error);
  })
  .pipe(new PassThrough({ objectMode: true })) // Change the require statement here
  .on('error', (error) => {
    console.error('Error processing row: ', error);
  })
  .pipe(new PassThrough({ objectMode: true, highWaterMark: batchSize }))
  .on('error', (error) => {
    console.error('Error processing batch: ', error);
  })
  .on('data', async (row) => {
    try {
      // Process each row
      await processBatch([row]);
    } catch (error) {
      console.error('Error processing row: ', error);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
