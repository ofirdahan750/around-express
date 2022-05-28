const User = require('../models/users');
const { onErrorHandle } = require('../utils/utils');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('No card found, Please try again');
      error.name = 'DocumentNotFoundError';
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      onErrorHandle(res, err);
    });
};

module.exports.createUser = (req, res) => {
  console.log('body:', req.body);
  const { name, about, avatar } = req.body;
  console.log('name:', name);
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      onErrorHandle(res, err);
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      onErrorHandle(res, err);
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.params._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      onErrorHandle(res, err);
    });
};
