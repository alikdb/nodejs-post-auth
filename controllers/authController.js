const { User } = require("../models");
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");

const { Op } = require("sequelize");

exports.register = async (req, res) => {
  const { username, name, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      name,
      password: hashedPassword,
      email,
    });

    const token = jtw.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });

    res.status(201).send({
      status: true,
      user,
      token,
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send({
        status: false,
        message: "Bu kullanıcı adı ve eposta daha önce kullanılmış.",
      });
    }
    res.status(500).send({
      status: false,
      message: "Bir sorun oluştu.",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: username }],
      },
    });
    if (!user) {
      throw new Error("not found user");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (typeof isPasswordValid == "undefined" || !isPasswordValid) {
      throw new Error("unvalid password");
    }

    const token = jtw.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });

    return res.send({
      status: true,
      user,
      token,
    });
  } catch (err) {
    return res.status(400).send({
      status: false,
      err,
      message: "Bu bilgilere ait bir kullanıcı bulunamadı.",
    });
  }
};

exports.authenticate = async (req, res) => {
  const user = await req.user;
  return res.json({
    status: true,
    user,
  });
};
