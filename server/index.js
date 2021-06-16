const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(upload.array());
//cors

//routers
app.use("/api/auth", require("./routes/api/auth.routes"));
app.use("/api/user", require("./routes/api/user.routes"));
app.use("/api/project", require("./routes/api/project.routes"));
app.use("/api/review", require("./routes/api/review.routes"));

const uri = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//set static folder if produciton
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection success");
  })
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
