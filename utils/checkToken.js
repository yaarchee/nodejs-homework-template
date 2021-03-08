const passport = require("passport");
require("../config/passport");
const { HttpCode } = require("./constants");

const checkToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
module.exports = checkToken;
