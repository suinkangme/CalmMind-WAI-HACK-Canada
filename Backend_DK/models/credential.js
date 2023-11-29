const mongoose = require('mongoose');

// Define the User schema
const credentialSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  
});

// Create the User model
const Credential = mongoose.model('Credential', credentialSchema);

module.exports = Credential;
