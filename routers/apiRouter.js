import express from "express";
import routes from "../routes";
import {
  postAddComment,
  postEditComment,
  postDeleteComment,
  postToggleLike,
} from "../controllers/photoController";
import { getUserLocations } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.editComment(), postEditComment);
apiRouter.post(routes.deleteComment(), postDeleteComment);
apiRouter.post(routes.getUserLocations(), getUserLocations);
apiRouter.post(routes.toggleLike(), postToggleLike);
export default apiRouter;
