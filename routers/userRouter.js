import express from "express";
import routes from "../routes";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import {
  userDetail,
  getEditProfile,
  changePassword,
  postEditProfile,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
