const express = require("express");
const router = express.Router();
const userController = require("../../controllers/controllersUsers");
const guard = require("../../utils/guard");
const checkToken = require("../../utils/checkToken");

router.post("/auth/registration", userController.reg);
router.post("/auth/login", userController.login);
router.post("/auth/logout", guard, userController.logout);
router.get("/current", checkToken, userController.getInfoUser);
router.post("/current", checkToken, userController.updateSubscriptionUser);

module.exports = router;
