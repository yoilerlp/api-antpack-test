const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");
const { generateToken } = require("../util/token");


const createAdmin = async (req, res) => {
  let password = req.body.password;

  bcrypt
    .hash(password, 10)
    .then((passwordHash) => {
      const userData = {
        ...req.body,
        password: passwordHash,
      };

      Admin.create(userData)
        .then((user) => {
          res.status(201).json({
            error: false,
            msg: "Admin creado correctamente",
            data: user,
          });
        })
        .catch((e) => {
          res.status(400).json({
            error: true,
            msg: e.errors[0].message,
          });
        });
    })
    .catch((e) => {
      res.status(400).json({
        error: true,
        msg: e,
      });
    });
};

const login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  const userFound = await Admin.findOne({ where: { email } });


  if (userFound === null) {
    res.status(404).json({ error: true, msg: "Email incorrecto" });
  } else {
    const match = await bcrypt.compare(password, userFound?.password);
    if (match) {
      // generate token login
     const token =  generateToken({ email })
      console.log({ token })

      res.status(200).json({
        error: false,
        msg: 'Logueado correctamente',
        data: {
          user: userFound,
          token,
          login: true,
        },
      });
    } else {
      res.status(404).json({
        error: true,
        msg: "Email o contraseña incorrecto",
      });
    }
  }
};

const getAll = async (req, res) => {
  res.json(await Admin.findAll());
};

module.exports = {
  createAdmin,
  getAll,
  login,
};
