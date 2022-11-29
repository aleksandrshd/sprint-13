const Card = require('../models/card');

const getCards = async (req, res) => {

  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);

  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Произошла ошибка'});
  }
}

const createCard = async (req, res) => {

  try {
    const newCard = await Card.create({name: req.body.name, link: req.body.link, owner: req.user});
    return res.status(201).json(newCard);

  } catch (err) {
    console.error(err);
    if (err.name = 'ValidationError') {
      const errors = Object.values(err.errors).map(err => err.message);
      return res.status(400).json({message: 'Переданы некорректные данные при создании карточки. ' + errors.join(', ')});
    } else {
      return res.status(500).json({message: 'Произошла ошибка'});
    }
  }
}

const deleteCard = async (req, res) => {

  try {
    const {id} = req.params;
    const query = await Card.findByIdAndRemove(id);
    console.log(query);

    if (!query) {
      return res.status(404).json({message: 'Карточка c указанным id не найдена'});
    }

    return res.status(200).json({message: 'Карточка удалена'});

  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Произошла ошибка'});
  }
}

const likeCard = async (req, res) => {

  try {
    const {id} = req.params;
    const query = await Card.findByIdAndUpdate(id, {$addToSet: {likes: req.user._id}}, {new: true});

    if (!query) {
      return res.status(404).json({message: 'Карточка c указанным id не найдена'});
    }

    return res.status(200).json({message: 'Лайк добавлен'});

  } catch (err) {
    console.error(err);
    if (err.name = 'CastError') {
      return res.status(400).json({message: 'Переданы некорректные данные для постановки лайка.'});
    } else {
      return res.status(500).json({message: 'Произошла ошибка'});
    }
  }
}

const dislikeCard = async (req, res) => {

  try {
    const {id} = req.params;
    const query = await Card.findByIdAndUpdate(id, {$pull: {likes: req.user._id}}, {new: true});

    if (!query) {
      return res.status(404).json({message: 'Карточка c указанным id не найдена'});
    }

    return res.status(200).json({message: 'Лайк удален'});

  } catch (err) {
    console.error(err);
    if (err.name = 'CastError') {
      return res.status(400).json({message: 'Переданы некорректные данные для снятия лайка.'});
    } else {
      return res.status(500).json({message: 'Произошла ошибка'});
    }
  }
}

module.exports = {getCards, createCard, deleteCard, likeCard, dislikeCard};