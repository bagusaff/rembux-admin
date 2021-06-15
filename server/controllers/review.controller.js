const Review = require("../models/review.model");

// create & save new Review
exports.createReview = async (req, res) => {
  //validation
  if (
    !req.body.clientName ||
    !req.body.projectName ||
    !req.body.description ||
    !req.body.rating
  ) {
    res.status(400).send({ message: "Form cant be empty!" });
  }

  try {
    //create Review
    const review = new Review({
      clientName: req.body.clientName,
      projectName: req.body.projectName,
      description: req.body.description,
      rating: req.body.rating,
      photo: req.body.photo,
    });
    // save Review to the database
    await review.save().then((data) => {
      res.send(data);
    });
  } catch (err) {
    console.log("err" + err);
    res.status(500).send(err);
  }
};

//read all Review from database
exports.findAllReview = (req, res) => {
  const clientName = req.query.clientName;
  var condition = clientName
    ? { clientName: { $regex: new RegExp(clientName), $options: "i" } }
    : {};

  Review.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred when retrieving review.",
      });
    });
};

//search single Review by the id
exports.findOneReview = (req, res) => {
  const id = req.params.id;

  Review.findById(id)
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "Cant find review with given id" });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//update Review by the id
exports.updateReview = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data cannot be empty",
    });
  }
  const id = req.params.id;
  Review.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update data id=${id}. Maybe data cant be found`,
        });
      } else res.send({ message: "Tutorial Updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//delete single Review
exports.deleteReview = (req, res) => {
  const id = req.params.id;

  Review.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete review id=${id}.`,
        });
      } else {
        res.send({
          message: `Successfully deleted review id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
