const mongoose = require('mongoose');
const { connect, connection } = require('mongoose');

// Set strictQuery to true to use strict mode for queries globally
mongoose.set('strictQuery', true);

connect('mongodb://localhost:27017/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

