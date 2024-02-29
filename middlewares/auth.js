const admin = require("../firebase");

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
