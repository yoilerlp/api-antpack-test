const User = require("../models/User");

const createUser = async (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json({
        error: false,
        msg: "Usuario creado correctamente",
        data: user,
      });
    })
    .catch((e) => {
      res.status(400).json({
        error: true,
        msg: e.errors[0].message,
      });
    });
};

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({
    error: false,
    data: users,
  });
};

const getUserById = async (req, res) => {
  let id = req.params.id;

  const userFound = await User.findOne({ where: { id } });

  if (!userFound) {
   return res.status(404).json({
      error: true,
      msg: "usuario no encontrado",
    });
  }

  return res.status(200).json({
    error: false,
    msg: "Usuario encontrado",
    data: userFound,
  });
};

const updateUser = async (req, res) => {
  let id = req.params.id;

  try {
    let userFound = await User.update(req.body, { where: { id } });
    return res.status(200).json({
      msg: "Usuario actualizado",
      data: userFound,
      error: false,
    });
  } catch (error) {
    res.status(404).json({
      msg: error.message,
      error: true,
    });
  }
};

const deleteUser = async (req, res) => {
  let id = req.params.id;

  const userFound = await User.findOne({ where: { id } });
  if (!userFound) {
    res.status(404).json({
      error: true,
      msg: "usuario no encontrado",
    });
  } else {
    await userFound.destroy();
    res.status(200).json({
      error: false,
      msg: "Usuario eliminado correctamente",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
