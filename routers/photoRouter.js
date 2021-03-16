import express from "express";
import routes from "../routes";
import {
  photoDetail,
  deletePhoto,
  getUpload,
  postUpload,
  getEditPhoto,
  postEditPhoto,
} from "../controllers/photoController";
import { uploadPhoto } from "../middlewares";

const photoRouter = express.Router();

photoRouter.get(routes.upload, getUpload);
photoRouter.post(routes.upload, uploadPhoto, postUpload);

photoRouter.get(routes.photoDetail(), photoDetail);

photoRouter.get(routes.editPhoto(), getEditPhoto);
photoRouter.post(routes.editPhoto(), postEditPhoto);

photoRouter.get(routes.deletePhoto(), deletePhoto);

export default photoRouter;
