const express = require("express");

const router = express.Router();
const { createUser } = require("../controllers/user");

router.get("/user", createUser);

module.exports = router;
