import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  name: String,
  mark: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: [Number],
  },
});

const model = mongoose.model("Location", LocationSchema);

LocationSchema.index({ mark: "2dsphere" });
export default model;
