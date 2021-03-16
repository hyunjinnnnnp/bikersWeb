import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
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
});

const model = mongoose.model("Photo", PhotoSchema);
export default model;
