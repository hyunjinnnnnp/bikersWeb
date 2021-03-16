import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Bikers";
  res.locals.routes = routes;
  next();
};
