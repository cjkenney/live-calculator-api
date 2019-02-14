require('dotenv').config();

let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_HOST).then(() => {
  console.log('Connected to database');
});

let FeedSchema = new mongoose.Schema({
  date: String,
  message: String
});

module.exports = mongoose.model('Feed', FeedSchema);
