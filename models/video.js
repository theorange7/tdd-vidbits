const { mongoose } = require('../database');

function validator(val) {
  return typeof val == 'string' || val instanceof String;
}

var custom = [validator, 'Title must be of type string!'];

const VideoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: custom
  },
  description: {
    type: String
  },
  url: {
    type: String,
    required: true
  }
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
