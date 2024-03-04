const express = require("express");

const router = express.Router();

//middleware

const { authCheck, adminCheck } = require("../middlewares/auth");
//controler
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);
// khi dòng code này chạy thì nó sẽ thực hiện tuần tự các function

module.exports = router;
