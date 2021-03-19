import dotenv from "dotenv";
import passport from "passport";
import KakaoStrategy from "passport-kakao";
import GoogleStrategy from "passport-google-oauth20";
import User from "./models/User";
import {
  kakaoLoginCallback,
  googleLoginCallback,
  // eslint-disable-next-line import/named
} from "./controllers/userController";

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
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
