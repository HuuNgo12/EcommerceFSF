const express = require("express");
const router = express.Router();

//middleware

const { authCheck, adminCheck } = require("../middlewares/auth");
//controler
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");

router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", update);
router.delete("/category/:slug", remove);

// khi dòng code này chạy thì nó sẽ thực hiện tuần tự các function

module.exports = router;
