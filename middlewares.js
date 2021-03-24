import multer from "multer";
import routes from "./routes";
import User from "./models/User";

const multerPhoto = multer({ dest: "uploads/photos" });
const multerAvatar = multer({ dest: "uploads/avatars" });

export const uploadPhoto = multerPhoto.single("file");
//TO DO : 최대 올릴 수 있는 이미지 갯수 지정하기
//https://github.com/expressjs/multer/blob/master/doc/README-ko.md
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = async (req, res, next) => {
  res.locals.siteName = "Bikers";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  const user = (await User.findById({ _id: req.user.id })) || null;
  res.locals.userName = user.name;
  res.locals.userAvatar = user.avatarUrl;
  res.locals.userId = user.id;
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
