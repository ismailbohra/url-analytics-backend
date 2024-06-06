const express = require("express");
const { login, createUser, getUser } = require("../controller/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/login", login);
router.post("/", createUser);
router.get("/", auth, getUser);

module.exports = router;
