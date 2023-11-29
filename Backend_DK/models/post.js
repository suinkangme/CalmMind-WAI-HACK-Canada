const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  credential: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Credential',
    required: true,
  },
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
