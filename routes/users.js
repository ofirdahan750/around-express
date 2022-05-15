const fsPromises = require('fs').promises;
const path = require("path");
const router = require("express").Router();

const userList = path.join(__dirname, "../data/users.json");

const getFileData = (filePath, res, msgErr) => {
  return fsPromises
    .readFile(filePath, { encoding: "utf8" })
    .then((data) => JSON.parse(data))
    .catch((err) => {
      res.status(500).send({ message: msgErr || err });
    });
};
router.get("/", (req, res) => {
  getFileData(userList, res);
});

const doesUserExist = (req, res) => {
getFileData(userList,res,'User ID not found')
};

router.use("/:id", doesUserExist);
router.get("/:id", doesUserExist);

module.exports = router;
