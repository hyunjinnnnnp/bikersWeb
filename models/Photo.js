import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  fileUrl: {
    type: Array,
    required: "File URL is required",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  likes: {
    type: String,
    default: "0",
  },
});

const model = mongoose.model("Photo", PhotoSchema);
export default model;
