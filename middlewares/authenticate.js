const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findByPk(decodedToken.userId);

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Doğrulama başarısız.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Doğrulama başarısız.",
    });
  }
};
module.exports = authenticate;
