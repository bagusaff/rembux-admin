const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const controller = require("../../controllers/review.controller");

//Upload new review
router.post("/", auth, controller.createReview);

//view all review
router.get("/", controller.findAllReview);

//find one review
router.get("/:id", controller.findOneReview);

//update one review
router.put("/:id", auth, controller.updateReview);

//delete one review
router.delete("/:id", auth, controller.deleteReview);

module.exports = router;
