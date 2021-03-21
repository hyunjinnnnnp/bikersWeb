import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  creatorName: {
    type: String,
    ref: "User",
  },
  creatorAvatar: {
    type: String,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
