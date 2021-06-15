const User = require("../models/user.model");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ username: user.username, id: user._id });
};
