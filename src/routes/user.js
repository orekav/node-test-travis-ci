const express = require("express");
const router = express.Router();
const { find, me, signUp, signIn, signOut, forgotPassword } = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/authentication");
const { validateCaptcha } = require("../middlewares/captcha");

router.get("/", isAuthenticated, find);
router.get("/me", isAuthenticated, me);
router.post("/signUp", validateCaptcha, signUp);
router.post("/signIn", validateCaptcha, signIn);
router.post("/signOut", isAuthenticated, signOut);
router.post("/forgotPassword", validateCaptcha, forgotPassword);

module.exports = router;