const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const userList = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  fs.readFile(userList, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.parse(data));
    }
  });
});

const doesUserExist = (req, res) => {
  const { id } = req.params;
  fs.readFile(userList, 'utf8', (err, data) => {
    if (err) throw err;
    if (!JSON.parse(data).find((user) => id === user._id)) {
      res.status(404).json({ message: 'User ID not found' });
      return;
    }
    res.status(200).json(JSON.parse(data).filter((user) => id === user._id));
  });
};
router.use('/:id', doesUserExist);
router.get('/:id', doesUserExist);

module.exports = router;
