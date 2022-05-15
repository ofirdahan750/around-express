const router = require("express").Router();
const fsPromises = require("fs").promises;
const path = require("path");

const cardsList = path.join(__dirname, "../data/cards.json");

router.get("/", (req, res) => {
  return fsPromises
    .readFile(cardsList, { encoding: "utf8" })
    .then((data) => JSON.parse(data))
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});
module.exports = router;
