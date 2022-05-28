const mongoose = require('mongoose');
const { inputReqErr } = require('../utils/constant');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: inputReqErr,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: inputReqErr,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: inputReqErr,
    validate: {
      validator(value) {
        /^https?:\/\/[w{3}.]?[A-Z0-9\-._~:?%#[\]/@!$&'()*+,;=]+[/#]?/gmi.test(value);
      },
      message: (input) => `${input.value} is not a valid URL!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
