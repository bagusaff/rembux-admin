const router = require("express").Router();
const auth = require("../../middleware/auth");

const controller = require("../../controllers/user.controller");

router.get("/public", controller.allAccess);

router.get("/board", auth, controller.userBoard);
router.get("/profile", auth, controller.getCurrentUser);

module.exports = router;
