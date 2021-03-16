import express from "express";
import routes from "../routes";
import {
  upload,
  photoDetail,
  editPhoto,
  deletePhoto,
} from "../controllers/photoController";

const photoRouter = express.Router();

photoRouter.get(routes.upload, upload);
photoRouter.get(routes.photoDetail, photoDetail);
photoRouter.get(routes.editPhoto, editPhoto);
photoRouter.get(routes.deletePhoto, deletePhoto);

export default photoRouter;
