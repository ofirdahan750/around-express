/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const { getUserAuthSchema } = require('../utils/validations');

const {
  getUsers,
  getCurrUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  updateUserSchema,
  updateAvatarSchema,
  getCurrUserSchema,
} = require('../utils/validations');

// route definitions
router.get('/', getUsers);
router.get('/me', getCurrUser);
router.get('/:userId', celebrate(getCurrUserSchema), getCurrUser);
router.patch('/me', celebrate(updateUserSchema), updateUser);
router.patch('/me/avatar', celebrate(updateAvatarSchema), updateAvatar);
router.post('/signin', celebrate(getUserAuthSchema), login);
router.post('/signup', celebrate(getUserAuthSchema), createUser);

module.exports = router;
