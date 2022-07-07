const { verifyToken } = require("../helpers/tokenHandler");
const { errorLog } = require("../helpers/errorHandler");

module.exports.isAuthorized = function (req, res, next) {
  // return next();
  try {
    const token = req.cookies["_accessToken"];
    if (!token) return res.redirect("/login");

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.redirect("/login");
    }
    req.user = decoded;
    next();
  } catch (error) {
    errorLog(error);
    return res.redirect("/login");
  }
};
module.exports.checkAuthorized = function (req, res, next) {
  // return next();
  try {
    const token = req.cookies["_accessToken"];
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        return res.redirect("/");
      }
    }
    next();
  } catch (error) {
    errorLog(error);
    next();
  }
};
