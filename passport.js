import dotenv from "dotenv";
import passport from "passport";
import KakaoStrategy from "passport-kakao";
import GoogleStrategy from "passport-google-oauth20";
import NaverStrategy from "passport-naver";
import User from "./models/User";
import {
  kakaoLoginCallback,
  googleLoginCallback,
  naverLoginCallback,
  // eslint-disable-next-line import/named
} from "./controllers/userController";

dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    },
    kakaoLoginCallback
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    googleLoginCallback
  )
);

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    },
    naverLoginCallback
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
