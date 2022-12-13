const express = require("express");
const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

// register
router.post(
  "/signup",
  validateBody(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);
// login
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  // validateBody(schemas.updateAvatarSchema),
  upload.single("avatarURL"),
  ctrl.updateAvatar
);

module.exports = router;
