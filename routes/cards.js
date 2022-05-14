const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const cardsList = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  fs.readFile(cardsList, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.parse(data));
    }
  });
});

module.exports = router;
