const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const controller = require("../../controllers/project.controller");

//Upload new project
router.post("/", auth, controller.createProject);

//view all project
router.get("/", controller.findAllProject);

//view eight project
router.get("/display", controller.findEightProject);

//find one project
router.get("/:id", controller.findOneProject);

//update one project
router.put("/:id", auth, controller.updateProject);

//delete one project
router.delete("/:id", auth, controller.deleteProject);

module.exports = router;
