const express = require("express");

const {joiSchema} = require("../../models/user");
const {controllerWrapper, validation, authenticate,upload} = require("../../middlewares");
const {auth: ctrl} = require("../../controllers");

const router = express.Router();

router.post("/register", validation(joiSchema), controllerWrapper(ctrl.register));
router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));
router.get("/logout", authenticate, controllerWrapper(ctrl.logout));
router.get("/current", authenticate, controllerWrapper(ctrl.current));
router.patch("/subscription", authenticate, controllerWrapper(ctrl.subscription));
router.patch("/avatars", authenticate, upload.single('image'), controllerWrapper(ctrl.avatarUpdate),);

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify));

router.post('/verify', controllerWrapper(ctrl.resendingEmail));




module.exports = router;