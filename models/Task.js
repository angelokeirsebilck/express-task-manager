const mongooose = require('mongoose');

const Task = mongooose.Schema({
  name: String,
  completed: Boolean,
});

module.exports = mongooose.model('Task', Task);
