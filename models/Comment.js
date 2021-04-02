import mongoose from "mongoose";
import { getCurrentDate } from "./Photo";
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
    type: String,
    default: getCurrentDate,
  },
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
