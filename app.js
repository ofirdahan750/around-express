const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/aroundb');
app.use((req, res, next) => {
  req.user = {
    _id: '6292273c6f5324a3f23385be',
  };

  next();
});
app.use(express.json());
app.use(helmet());
app.use('/users', userRouter);
app.use('/cards', cardsRouter);
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
