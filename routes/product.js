const express = require("express");

const router = express.Router();

//middleware

const { authCheck, adminCheck } = require("../middlewares/auth");
//controler
const { create, read } = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products", read);

// khi dòng code này chạy thì nó sẽ thực hiện tuần tự các function

module.exports = router;
