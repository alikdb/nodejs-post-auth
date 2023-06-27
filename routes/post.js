const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");
router.post("/create", authenticate, postController.createPost);
router.delete("/delete/:id", authenticate, postController.deletePost);

module.exports = router;
