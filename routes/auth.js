const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { checkAuthorized } = require("../middleware/auth");
const inputValidator = require("../middleware/inputValidator");
const validationAttributes = require("../validations/user.json");

router.get("/login", checkAuthorized, authController.login);

router.post(
  "/login",
  inputValidator.validate(validationAttributes.login, "/login"),
  authController.loginSubmit
);

router.get("/register", checkAuthorized, authController.register);

router.post(
  "/register",
  inputValidator.validate(validationAttributes.login, "/register"),
  authController.registerSubmit
);

router.get("/logout", authController.logout);

module.exports = router;
