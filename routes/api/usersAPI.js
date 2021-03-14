const express = require("express");
const router = express.Router();
const userController = require("../../controllers/controllersUsers");
const guard = require("../../utils/guard");
const checkToken = require("../../utils/checkToken");
const upload = require("../../utils/upload");
const { validateUploadAvatar } = require("./validationAvatar");

router.post("/auth/registration", userController.reg);
router.post("/auth/login", userController.login);
router.post("/auth/logout", guard, userController.logout);
router.get("/current", checkToken, userController.getInfoUser);
router.post("/current", checkToken, userController.updateSubscriptionUser);
router.patch(
  "/avatars",
  [guard, upload.single("avatar"), validateUploadAvatar],
  userController.avatars
);

module.exports = router;
