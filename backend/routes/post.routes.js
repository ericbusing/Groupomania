const router = require("express").Router();
const postController = require("../controllers/post.controller");
const likesController = require("../controllers/likesController");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, postController.readPost);
router.post("/", auth, multer, postController.createPost);
router.put("/:id", auth, multer, postController.modifyPost);
router.delete("/:id", auth, multer, postController.deletePost);
router.get("/getAllPosts", auth, postController.getAllPostsFromUser);
router.post("/:id/like", likesController.likePost);

module.exports = router;
