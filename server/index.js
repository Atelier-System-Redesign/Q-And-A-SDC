/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const path = require('path');

// Middleware
const morgan = require('morgan');
const cors = require('cors');

// Router
const router = require('./routes.js');

const app = express();
module.exports.app = app;
const port = 3000 || process.env.PORT;

// Logging and parsing
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const staticFilePath = path.join(__dirname, '..', 'public');
app.use(express.static(staticFilePath));

// Set up routes
app.use('/qa', router);

app.get('/', (req, res) => {
  res.send('Welcome to the home page');
});

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
