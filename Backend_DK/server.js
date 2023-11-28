// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// connect to mongodb

mongoose.connect(process.env.DB_URL)
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(process.env.PORT, function () {
  console.log('Server is listening on port ' + process.env.PORT);
});


app.get('/', function (request, response) {
  response.send('Home - Your Daily Dose of Mental Wellness');
});
