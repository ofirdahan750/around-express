const onErrorHandle = (res, err) => {
  switch (err.name) {
    case 'DocumentNotFoundError':
      return res.status(404).send({ message: `Error: User not found, ${err.message}` });
    case 'CastError':
      return res.status(400).send({ message: `Invalid data passed to the methods for creating a card/user or updating a user's avatar/profile , ${err.message}` });
    case 'ValidationError':
      return res.status(400).send({ message: `Validation Error! , ${err.message}` });
    default:
      return res.status(500).send({ message: `Error: Something went wrong, Please try agian later ${err.message}` });
  }
};
module.exports = { onErrorHandle };
