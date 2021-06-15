const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    type: String,
    thumbnail: String,
  },
  { timestamps: true }
);

// projectSchema.method("toJSON",function(){
//   const {__v, _id, ...object} = this.toObject();
//   object.id = _id;
//   return object;
// })

module.exports = Project = mongoose.model("project", projectSchema);
