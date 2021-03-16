import express from "express";
import routes from "../routes";
import {
  photoDetail,
  editPhoto,
  deletePhoto,
  getUpload,
  postUpload,
} from "../controllers/photoController";

const photoRouter = express.Router();

photoRouter.get(routes.upload, getUpload);
photoRouter.post(routes.upload, postUpload);
photoRouter.get(routes.photoDetail(), photoDetail);
photoRouter.get(routes.editPhoto, editPhoto);
photoRouter.get(routes.deletePhoto, deletePhoto);

export default photoRouter;
