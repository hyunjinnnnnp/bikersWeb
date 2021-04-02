import express from "express";
import routes from "../routes";
import {
  deletePhoto,
  getUpload,
  postUpload,
  getEditPhoto,
  postEditPhoto,
} from "../controllers/photoController";
import { uploadPhoto, onlyPrivate } from "../middlewares";

const photoRouter = express.Router();

photoRouter.get(routes.upload, onlyPrivate, getUpload);
photoRouter.post(routes.upload, onlyPrivate, uploadPhoto, postUpload);

photoRouter.get(routes.editPhoto(), onlyPrivate, getEditPhoto);
photoRouter.post(routes.editPhoto(), onlyPrivate, postEditPhoto);

photoRouter.get(routes.deletePhoto(), onlyPrivate, deletePhoto);

export default photoRouter;
