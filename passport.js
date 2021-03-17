import dotenv from "dotenv";
import passport from "passport";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import { kakaoLoginCallback } from "./controllers/userController";

dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      clientSecret: "",
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    },
    kakaoLoginCallback
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
