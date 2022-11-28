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
    const newCard = await Card.create(req.body);
    return res.status(201).json(newCard);

  } catch (err) {
    console.error(err);
    const errors = Object.values(err.errors).map(err => err.message);
    return res.status(500).json({message: errors.join(', ')});
  }
}

const deleteCard = async (req, res) => {

  try {
    const {id} = req.params;
    await Card.findByIdAndRemove(id);

    /*if (!) {
      return res.status(404).json({message: 'Карточка не найдена'});
    }*/

    return res.status(200).json({message: 'Карточка удалена'});

  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Произошла ошибка'});
  }
}

module.exports = { getCards, createCard, deleteCard };