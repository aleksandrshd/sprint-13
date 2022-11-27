const userModel = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Произошла ошибка'});
  }
}

const createUser = (req, res) => {
  return res.status(200).send({createUser: true});
}

const getUser = (req, res) => {
  return res.status(200).send({getUser: true});
}

module.exports = { getUsers, createUser, getUser };