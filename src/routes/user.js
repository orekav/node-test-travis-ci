const express = require("express");
const router = express.Router();
const { find, signUp, signIn, signOff, forgotPassword } = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/authentication");
const { validateCaptcha } = require("../middlewares/captcha");

router.get("/", find);
router.post("/signUp", validateCaptcha, signUp);
router.post("/signIn", validateCaptcha, signIn);
router.post("/signOff", isAuthenticated, signOff);
router.post("/forgotPassword", validateCaptcha, forgotPassword);

module.exports = router;