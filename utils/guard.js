const passport = require("passport");
require("../config/passport");
const { HttpCode } = require("./constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const token = req.get("Authorization")?.split(" ")[1];
    if (!user || err || token !== user.token) {
      console.log(token);
      console.log(user);

      return res.status(HttpCode.FORBIDDEN).json({
        status: "error",
        code: HttpCode.FORBIDDEN,
        data: "Forbidden",
        message: "Access is denied",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
