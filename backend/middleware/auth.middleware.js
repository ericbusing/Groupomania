require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    const admin = decodedToken.admin;
    const pseudo = decodedToken.pseudo;

    if (admin) {
      next();
    } else {
      if (req.body.userId && req.body.userId !== userId) {
        throw "UserId non valide !";
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(403).json({ error: new Error("Requête non authorisée !") });
  }
};
