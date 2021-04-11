import fs from "fs";
import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import Photo from "../models/Photo";

export const getJoin = (req, res) =>
  res.render("join", {
    pageTitle: "Join",
  });
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
export const getLogin = (req, res) => {
  res.render("login", {
    pageTitle: "LogIn",
  });
};
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const kakaoLogin = passport.authenticate("kakao");

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, properties, kakao_account: kakaoAccount },
  } = profile;
  const { email } = kakaoAccount;
  const { profile_image_url: profileImg, nickname } = properties;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name: nickname,
      kakaoId: id,
      avatarUrl: profileImg,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};
export const postGoogleLogin = (req, res) => {
  res.redirect(routes.home);
};
export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleLoginCallback = async (_, __, profile, cb) => {
  const {
    id,
    _json: { name, picture: avatarUrl, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      avatarUrl,
      googleId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    console.log(error);
    return cb(error);
  }
};

export const naverLogin = passport.authenticate("naver");
export const postNaverLogin = (req, res) => res.redirect(routes.home);
export const naverLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { email, nickname: name, profile_image: avatarUrl, id },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.naverId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      avatarUrl,
      naverId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    console.log(error);
    return cb(error);
  }
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const getUserLocations = async (req, res) => {
  try {
    const {
      body: { userId },
    } = req;
    const user = await User.findById({ _id: userId })
      .populate("photos")
      .populate("locations");
    res.json(user.locations);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const getMe = async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findById({ _id: req.user.id })
    .populate("photos")
    .populate("locations");
  const userLocations = user.locations;
  try {
    res.render("userDetail", {
      pageTitle: "Users Detail",
      user,
      userLocations,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getLikeList = async (req, res) => {
  const { user: loggedUser } = req;
  try {
    const user = await User.findById({ _id: loggedUser.id });
    const photos = await Photo.find({ _id: { $in: user.likes } })
      .populate("creator")
      .populate("comments")
      .populate("location");
    res.render("likeList", {
      pageTitle: "Likes",
      user,
      photos,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const userDetail = async (req, res) => {
  const {
    params: { id },
    user: loggedUser,
  } = req;
  try {
    const user = await User.findById({ _id: id }).populate("photos");

    res.render("userDetail", {
      pageTitle: "User Detail",
      user,
      loggedUser,
    });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const userPhotos = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    const photos = await Photo.find({ creator: id }).populate("location");
    res.render("userPhotos", {
      pageTitle: `${user.name} : Photos`,
      user,
      photos,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) => {
  const { user } = req;
  res.render("editProfile", {
    pageTitle: "Edit Profile",
    user,
  });
};
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    const user = await User.findById(req.user.id);
    if (user.avatarUrl) {
      fs.unlink(user.avatarUrl, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });

    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.redirect(routes.editProfile);
  }
};
export const getChangePassword = (req, res) => {
  res.render("changePassword", {
    pageTitle: "Change Password",
  });
};
export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
