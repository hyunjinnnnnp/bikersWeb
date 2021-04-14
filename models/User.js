import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import dotenv from "dotenv";

dotenv.config();

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: {
    type: String,
    default: process.env.DEFAULT_AVATAR_URL,
  },
  naverId: Number,
  kakaoId: Number,
  googleId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
    },
  ],
  locations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
const model = mongoose.model("User", UserSchema);

export default model;
