const fsPromises = require("fs").promises;
const path = require("path");
const router = require("express").Router();
const userList = path.join(__dirname, "../data/users.json");

router.get("/", (req, res) => {
  return fsPromises
    .readFile(userList, { encoding: "utf8" })
    .then((data) => res.send(JSON.parse(data)))
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

const doesUserExist = (req, res) => {
  const { id } = req.params;
  return fsPromises.readFile(userList, { encoding: "utf8" }).then((data)=>{
    if (!JSON.parse(data).find((user) => id === user._id)) {
      return res.status(404).json({ message: "User ID not found" });
    }
    else {
     return res.status(200).json(JSON.parse(data).filter((user) => id === user._id));
    }
    }).catch((err) => {
      res.status(500).send({ message: err });
    });
};

router.use('/:id', doesUserExist);

router.get("/:id", doesUserExist);

module.exports = router;
