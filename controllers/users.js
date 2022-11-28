const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);

  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Произошла ошибка'});
  }
}

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);

  } catch (err) {
    console.error(err);
    const errors = Object.values(err.errors).map(err => err.message);
    return res.status(500).json({message: errors.join(', ')});
  }
}

const getUser = async (req, res) => {

  try {
    const {id} = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({message: 'Пользователь не найден'});
    }

    return res.status(200).json(user);

  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Произошла ошибка'});
  }
}

module.exports = { getUsers, createUser, getUser };
