const mongoose = require('mongoose');
const { inputReqErr } = require('../utils/constant');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: inputReqErr,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: inputReqErr,
    validate: {
      validator(value) {
        /^https?:\/\/[w{3}.]?[A-Z0-9\-._~:?%#[\]/@!$&'()*+,;=]+[/#]?/gim.test(value);
      },
      message: (input) => `${input.value} is not a valid URL`,
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Owner ID is required'],
  },
  likes: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('card', cardSchema);
