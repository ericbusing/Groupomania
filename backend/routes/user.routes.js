// Importation d'Express.
const router = require("express").Router();
// Importation du dossier des controlleurs utilisateurs.
const auth = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

// Creation des routes pour utilisateurs.
// Authentification.
router.post("/register", userController.signup);
router.post("/login", userController.login);
// User DB.
router.get("/profile/:id", auth, userController.getOneUser);
router.get("/me", auth, userController.me);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
