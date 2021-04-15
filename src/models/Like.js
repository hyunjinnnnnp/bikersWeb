import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  photoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photo",
  },
});
const model = mongoose.model("Like", LikeSchema);
export default model;
