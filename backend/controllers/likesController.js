// Importation du modele de post.
const Post = require("../models/post.model");

exports.likePost = (req, res) => {
  if (req.body.like === 1) {
    // Mise a jour de la post dans la bdd, et de son array.
    Post.updateOne(
      { _id: req.params.id },
      {
        // Utilisation de l'operateur $inc.
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
      },
      console.log("ici", req.body)
    )
      .then(() => res.status(200).json({ message: "+1 like !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
    Post.updateOne(
      { _id: req.params.id },
      {
        // (req.body.like++) -1 permet au dislike d'appliquer la bonne decrementation. Exemple:(2) -1=1.
        $inc: { dislikes: req.body.like++ * -1 },
        // Utilisation de l'operateur $push.
        $push: { usersDisliked: req.body.userId },
      }
    )
      .then(() => res.status(200).json({ message: "+1 dislike !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    // Recuperation de la post dans la bdd.
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        // Utilisation de la methode includes().
        if (post.usersLiked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            {
              // Utilisation de l'operateur $pull.
              $pull: { usersLiked: req.body.userId },
              $inc: { likes: -1 },
            }
          )
            .then(() => res.status(200).json({ message: "like -1 !" }))
            .catch((error) => res.status(400).json({ error }));
        } else if (post.usersDisliked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then(() => res.status(200).json({ message: "Dislike -1 !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
