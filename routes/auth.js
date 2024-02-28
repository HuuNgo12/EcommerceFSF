const express = require("express");

const router = express.Router();

//middleware

const { authCheck } = require("../middlewares/auth");
//controler
const { createOrUpdateUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
// khi dòng code này chạy thì nó sẽ thực hiện tuần tự các function

module.exports = router;
