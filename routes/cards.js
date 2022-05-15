const router = require("express").Router();
const fsPromises = require('fs').promises;
const path = require("path");

const cardsList = path.join(__dirname, "../data/cards.json");

const getFileData = (filePath, res, msgErr) => {
  return fsPromises
    .readFile(filePath, { encoding: "utf8" })
    .then((data) => JSON.parse(data))
    .catch((err) => {
      res.status(500).send({ message: msgErr || err });
    });
};

router.get("/", (req, res) => {
  getFileData(cardsList, res);
});
module.exports = router;
