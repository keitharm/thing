'use strict'

const mongoose = require('mongoose')

function connect () {
  return mongoose.connect(process.env.MONGODB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch(err => {}) // Error handler below handles this
}

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log('Connected to db')
});

module.exports = { connect }
