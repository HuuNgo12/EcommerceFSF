const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
// import routes
// const authRoutes = require("./routes/auth");

//App
const app = express();

//database
mongoose
  .connect(
    process.env.DATABASE
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false, // Sửa lại thành useFindAndModify
    // useUnifiedTopology: true,
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes middleware
// app.use("/api", authRoutes); đây là cách import từng route.

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
); // đây là cách import tự động tất cả các route. readdirsync
//sẽ tự động lấy tất cả các route từ cái đường dẫn '/routes' trả về 1 mảng => dùng map() để lấy ra từng route và dùng.

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
