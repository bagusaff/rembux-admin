const Project = require("../models/project.model");
// create & save new project
exports.createProject = async (req, res, next) => {
  if (!req.body.title || !req.body.type || !req.body.description) {
    res.status(400).send({ message: "Form cant be empty!" });
    return;
  }

  try {
    //create project
    const project = new Project({
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      thumbnail: req.body.thumbnail,
    });
    // save project to the database
    const createdProject = await project.save();
    res.send(createdProject);
  } catch (err) {
    console.log("err" + err);
    res.status(500).send(err);
    next(err);
  }
};

//read all project from database
exports.findAllProject = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Project.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred when retrieving project.",
      });
    });
};

//search single project by the id
exports.findOneProject = (req, res) => {
  const id = req.params.id;

  Project.findById(id)
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "Cant find tutorial with given id" });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//update project by the id
exports.updateProject = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data cannot be empty",
    });
  }
  const id = req.params.id;
  Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

//delete single project
exports.deleteProject = (req, res) => {
  const id = req.params.id;

  Project.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete project id=${id}.`,
        });
      } else {
        res.send({
          message: `Successfully deleted project id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
