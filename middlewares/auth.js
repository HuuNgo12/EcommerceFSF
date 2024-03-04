const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); //token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log("FIREBAE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next(); // this is a callback function. This  function is called when we want to move to next middleware.
  } catch (err) {
    res.status(401).json({ err: "Invalid or expired token" });
  }
};

exports.adminCheck = async (req, res, next) => {
  // const { email } = req.user;
  try {
    const adminUser = await User.findOne({ email: req.user.email }).exec();
    if (adminUser.role !== "admin") {
      return res.status(403).json({
        err: "Admin resource. Access denied",
      });
    } else {
      next();
    }
  } catch (err) {
    // Xử lý lỗi nếu có
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
