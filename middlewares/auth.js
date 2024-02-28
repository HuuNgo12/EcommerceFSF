const admin = require("../firebase");

exports.authCheck = (req, res, next) => {
  console.log(req.headers); //token
  next(); // this is a callback function. This  function is called when we want to move to next middleware.
};
