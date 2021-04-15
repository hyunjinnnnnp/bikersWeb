import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";
import User from "./models/User";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const multerPhoto = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "bikerss3/photo",
  }),
  // limits: { fileSize: 5 * 1024 * 1024 },
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "bikerss3/avatar",
  }),
});

export const uploadPhoto = multerPhoto.array("file", 5);
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = async (req, res, next) => {
  res.locals.siteName = "Bikers";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; //로컬 미들웨어 사용처는 퍼그?

  if (req.user) {
    const user = (await User.findById({ _id: req.user.id })) || null;
    res.locals.userName = user.name;
    res.locals.userAvatar = user.avatarUrl;
    res.locals.userId = user.id;
  } //다시생각해보자..
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
