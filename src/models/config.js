const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

module.exports = () => {
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};
