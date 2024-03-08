const express = require("express");
const router = express.Router();

//middleware

const { authCheck, adminCheck } = require("../middlewares/auth");
//controler
const { create, read, update, remove, list } = require("../controllers/sub");

router.post("/sub", authCheck, adminCheck, create);
router.get("/subs", list);
router.get("/sub/:slug", read);
router.put("/sub/:slug", authCheck, adminCheck, update);
router.delete("/sub/:slug", authCheck, adminCheck, remove);

// khi dòng code này chạy thì nó sẽ thực hiện tuần tự các function

module.exports = router;
