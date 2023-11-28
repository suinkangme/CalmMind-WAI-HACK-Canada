const mongoose = require('mongoose');

// Define the Counter schema
const counterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  totalPost: {
    type: Number,
    default: 0,
  },
});

// Create the Counter model
const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;