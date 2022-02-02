const jwt = require("jsonwebtoken");

const { KEY } = require("./secret");

const generateToken = (data) => {
   return jwt.sign(data, KEY, { expiresIn: '1h' })
};

module.exports = {
  generateToken,
};
