const Post = require("../models/post.model");
const fs = require("fs");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Permet d'afficher les posts.
module.exports.readPost = (req, res) => {
  Post.find((err, data) => {
    if (!err) res.send(data);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};
// // Permet de creer un post.
module.exports.createPost = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId,
    });
    const pseudo = user.pseudo;
    const post = req.body;
    if (req.file) {
      const postCreated = await Post.create({
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        pseudo,
        ...post,
      });
      postCreated.save();
      res.status(201).json({ message: "Post enregistré!" });
    } else {
      const postCreated = await Post.create({
        pseudo,
        ...post,
      });
      postCreated.save();
      res.status(201).json({ message: "Post enregistré!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
// Modification de post.

module.exports.modifyPost = async (req, res, next) => {
  try {
    const postToUpdate = await Post.findOne({
      _id: req.params.id,
    });

    if (req.file) {
      const newPost = req.body;
      if (newPost.picture !== postToUpdate) {
        fileName = postToUpdate.picture?.split("/images/")[1];
        fs.unlink(`images/${fileName}`, async () => {
          await Post.updateOne(
            { _id: req.params.id },
            {
              picture: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
              ...newPost,
            }
          );
        });
        res.status(201).json({ message: "Post modifié !" });
      }
    } else {
      const newPost = req.body;
      await Post.updateOne(
        { _id: req.params.id },
        {
          ...newPost,
        }
      );
      res.status(201).json({ message: "Post modifié ! " });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

// // Suppression de post.
module.exports.deletePost = async (req, res, next) => {
  try {
    // Recuperation du post.
    const postToDelete = await Post.findOne({ _id: req.params.id });
    // Recuperation du nom de fichier grace a split.
    const filename = postToDelete.picture?.split("/images")[1];
    fs.unlink(`images/${filename}`, () => {
      // Suppression de l'enregistrement dans la bdd.
      Post.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({ message: "Post supprimé !" });
        })
        .catch((error) => res.status(401).json(error));
    });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

// Fonction utile pour recuperer un post avec son id.
module.exports.getOnePost = (req, res, next) => {
  // Methode findOne pour mettre a jour UN element.
  Post.findOne({ _id: req.params.id })
    // Renvoi de la reponse de reussite avec un code 200.
    .then((post) => res.status(200).json(post))
    // Renvoi de la reponse d'erreur avec un code 400.
    .catch((error) => res.status(400).json({ error }));
};

// Fonction utile pour la page profil.
module.exports.getAllPostsFromUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    const posts = await Post.find({ userId: userId });
    console.log("userId", userId);
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
