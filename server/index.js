const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
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
