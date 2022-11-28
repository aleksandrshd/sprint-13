const router = require('express').Router();

const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

router.get('/:id', deleteCard);

module.exports = router;