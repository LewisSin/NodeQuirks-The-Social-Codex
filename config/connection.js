const { connect, connection } = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetwork';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = connection;
