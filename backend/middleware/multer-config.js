// Importation du package multer.
const multer = require("multer");
// Creation d'une dictionnaire pour les extensions.
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

/**
 * Configuration de l'enregistrement des fichiers entrants.
 */
const storage = multer.diskStorage({
  // Avec la fonction destination on indique qu'il faut enregistrer dans le dossier img.
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // La fonction filename est pour utiliser le nom d'origine.
  filename: (req, file, callback) => {
    // Remplacement des espaces par des underscores.
    const name = file.originalname.split(" ").join("_");
    // Ajout de l'extension.
    const extension = MIME_TYPES[file.mimetype];
    // Utilisation d'un timestamp pour donner la date a laquelle
    // le fichier a ete enregistrer dans le nom de celui-ci.
    callback(null, name + Date.now() + "." + extension);
  },
});
// Exportation du module.
module.exports = multer({ storage }).single("images");
