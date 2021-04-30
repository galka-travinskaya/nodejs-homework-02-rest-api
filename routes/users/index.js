const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const guard = require("../../helpers/guard");
const {
  validationCreateUser,
  validationLoginUser,
} = require("./validate-user-router.js");

router.get('/current', guard, ctrl.current)
router.post("/signup", validationCreateUser, ctrl.signup);
router.post("/login", validationLoginUser, ctrl.login);
router.post("/logout", guard, ctrl.logout);

module.exports = router;
