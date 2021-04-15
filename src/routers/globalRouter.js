import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  kakaoLogin,
  postKakaoLogin,
  googleLogin,
  postGoogleLogin,
  getMe,
  naverLogin,
  postNaverLogin,
  getLikeList,
} from "../controllers/userController";
import { home, search } from "../controllers/photoController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: routes.login }),
  postKakaoLogin
);

globalRouter.get(routes.google, googleLogin);
globalRouter.get(
  routes.googleCallback,
  passport.authenticate("google", { failureRedirect: routes.login }),
  postGoogleLogin
);
globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", { failureRedirect: routes.login }),
  postNaverLogin
);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.me, onlyPrivate, getMe);
globalRouter.get(routes.likeList, onlyPrivate, getLikeList);
export default globalRouter;
