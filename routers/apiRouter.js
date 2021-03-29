import express from "express";
import routes from "../routes";
import {
  postAddComment,
  postEditComment,
  postDeleteComment,
} from "../controllers/photoController";
import { userInfo } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.editComment(), postEditComment);
apiRouter.post(routes.deleteComment(), postDeleteComment);
apiRouter.get(routes.getUserInfo, userInfo);
export default apiRouter;
