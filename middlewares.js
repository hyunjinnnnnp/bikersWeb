import routes from "./routes";
import multer from "multer";

const multerPhoto = multer({ dest: "uploads/photos" });
export const uploadPhoto = multerPhoto.single("file");
//TO DO : 최대 올릴 수 있는 이미지 갯수 지정하기

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Bikers";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};
