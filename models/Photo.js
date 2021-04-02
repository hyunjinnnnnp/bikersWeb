import mongoose from "mongoose";

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return new Date(year, month, today, hours, minutes);
};
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
    type: String,
    default: getCurrentDate,
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
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const model = mongoose.model("Photo", PhotoSchema);
export default model;
