require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signup = async (req, res, next) => {
  try {
    //Je vérifie que je n'ai pas déjà un user existant ou un email existant
    const pseudo = await User.findOne({
      pseudo: req.body.pseudo,
    });
    const email = await User.findOne({
      email: req.body.email,
    });

    if (pseudo) {
      throw new Error("This username already exists !");
    }

    if (email) {
      throw new Error("This email is already taken !");
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: hash,
    });
    user.save();
    res.status(201).json({ message: "User has been created !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      throw new Error("No email address");
    }

    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      throw new Error("Wrong password !");
    }

    return res.status(200).json({
      userId: user.id,
      admin: user.admin,
      token: jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
      }),
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.me = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found !");
    }
    if (!userId) {
      throw new Error("Bad token ! ");
    }

    return res.status(200).json({
      userId: user.id,
      admin: user.admin,
      token: jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
      }),
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error });
  }
};

// Permet de modifier la bio de l'user.
exports.updateUser = async (req, res) => {
  try {
    // Trouver l'element et le mettre a jour.
    await User.findOneAndUpdate(
      // Quel element ?
      { _id: req.params.id },
      {
        $set: {
          pseudo: req.body.pseudo,
        },
      }
    );
    res.status(200).json({ message: "Pseudo has been updated !" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// Permet de supprimer l'user.
exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "User has been deleted !" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};
