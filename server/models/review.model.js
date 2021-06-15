const mongoose = require("mongoose");

const requiredString = {
  type: String,
  required: true,
};

const reviewSchema = new mongoose.Schema(
  {
    clientName: requiredString,
    projectName: requiredString,
    description: requiredString,
    rating: {
      type: Number,
      max: 5,
      min: 1,
      required: true,
    },
    photo: String,
  },
  { timestamps: true }
);

// projectSchema.method("toJSON",function(){
//   const {__v, _id, ...object} = this.toObject();
//   object.id = _id;
//   return object;
// })

module.exports = Review = mongoose.model("review", reviewSchema);
