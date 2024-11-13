const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Import the controller file
const trackRouter = require('./controllers/tracks.js');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors({ origin: 'http://127.0.0.1:5173' }));
app.use(express.json());

// Routes go here
app.use('/tracks', trackRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});