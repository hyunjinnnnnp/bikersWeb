import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  name: String,
  mark: {
    type: {
      type: String,
      enum: ["Point"],
      //   required: true,
    },
    coordinates: [Number],
  },
});

const model = mongoose.model("Location", LocationSchema);

LocationSchema.index({ mark: "2dsphere" });
export default model;
