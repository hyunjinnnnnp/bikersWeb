import express from "express";
import routes from "../routes";
import {
  postAddComment,
  postEditComment,
  postDeleteComment,
} from "../controllers/photoController";

const apiRouter = express.Router();

apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.editComment(), postEditComment);
// apiRouter.post(routes.deleteComment, postDeleteComment);

export default apiRouter;
