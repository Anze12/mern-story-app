const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  favoritedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},{ timestamps: true });

module.exports = mongoose.model('Story', StorySchema);