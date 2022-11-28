const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

/*app.use((req, res, next) => {
  req.user = {
    _id: '638369d5b608a6011e85b877'
  };
  next();
});*/

app.use('/users', usersRouter);

app.use('/cards', cardsRouter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true
}, () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});