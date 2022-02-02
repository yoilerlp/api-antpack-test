const jwt = require("jsonwebtoken");
const { KEY } = require("../util/secret");

const authenticateToken = (req, res, next) => {
  const token = req.headers["access-token"];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, KEY, (err, decode) => {
    console.log(err);
    if (err) {
      res.status(403).json({
        error: true,
        msg: "Neceistas estar autenticado",
      });
     
    }
  });

   next();
};

module.exports = {
  authenticateToken,
};
