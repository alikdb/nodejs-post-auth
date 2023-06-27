const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/authenticate", authenticate, authController.authenticate);

module.exports = router;
