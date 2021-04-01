/* eslint-disable no-underscore-dangle */
import routes from "../routes";
import Photo from "../models/Photo";
import Comment from "../models/Comment";
import Location from "../models/Location";
import User from "../models/User";

export const home = async (req, res) => {
  const { user: loggedUser } = req;
  try {
    const photos = await Photo.find({})
      .sort({ _id: -1 })
      .populate("creator")
      .populate("comments")
      .populate("location");
    res.render("home", {
      pageTitle: "Home",
      photos,
      loggedUser,
    });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", photos: [], loggedUser });
  }
};

export const postAddLike = async (req, res) => {
  const {
    body: { photoId },
    user: loggedUser,
  } = req;
  try {
    //라이크 모델을 없애고 그냥 photo.likes에 유저 아이디를 저장하면 더 편하지않나?
    //왜 안됐을까?
    const photo = await Photo.findById(photoId);
    const user = await User.findById(loggedUser._id);
    // const newLike = await Like.create({
    //   userId: loggedUser,
    //   photoId,
    // });
    user.likes.push(photoId);
    photo.likes.push(user._id);
    user.save();
    photo.save();

    console.log(`✅ ${photo}, ✅ ${user}`);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const search = async (req, res) => {
  const {
    user,
    query: { term: searchingBy },
  } = req;
  try {
    const photos = await Photo.find({
      description: { $regex: searchingBy, $options: "i" },
    })
      .sort({ _id: -1 })
      .populate("comments")
      .populate("creator");
    res.render("search", {
      pageTitle: "Search",
      searchingBy,
      photos,
      user,
    });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", photos: [], user });
  }
};
export const getUpload = (req, res) => {
  res.render("upload", {
    pageTitle: "Upload Photo",
  });
};
export const postUpload = async (req, res) => {
  const {
    body: { description, location: currentLocation },
    files,
    user: loggedUser,
  } = req;
  const fileUrl = files.map((file) => file.path);
  let location;
  try {
    if (currentLocation !== "") {
      const lng = currentLocation.split(",")[0];
      const lat = currentLocation.split(",")[1];
      const name = currentLocation.split(",")[2];

      location = await Location.create({
        name,
        mark: {
          type: "Point",
          coordinates: [lng, lat],
        },
      });
    }
    // eslint-disable-next-line no-underscore-dangle
    const newPhoto = await Photo.create({
      fileUrl,
      description,
      creator: loggedUser.id,
      location,
    });
    const user = await User.findById({ _id: loggedUser.id }).populate(
      "locations"
    );
    user.locations.push(location.id);
    user.photos.push(newPhoto.id);
    user.save();
    res.redirect(routes.photoDetail(newPhoto.id));
  } catch (error) {
    console.log(error);
  }
};

export const photoDetail = async (req, res) => {
  const {
    params: { id },
    user: loggedUser,
  } = req;
  try {
    const photo = await Photo.findById(id)
      .populate("creator")
      .populate("comments")
      .populate("location")
      .populate("likes");
    res.render("photoDetail", {
      pageTitle: `${photo.creator.name}: ${photo.description}`,
      photo,
      loggedUser,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;

  let commentId;
  try {
    const photo = await Photo.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creatorId: user.id,
      creatorName: user.name,
      creatorAvatar: user.avatarUrl,
    });
    // eslint-disable-next-line no-underscore-dangle
    commentId = await newComment._id;
    photo.comments.push(commentId);
    res.json(commentId);
    photo.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const postEditComment = async (req, res) => {
  const {
    params: { id },
    body: { editedComment },
  } = req;
  try {
    await Comment.findOneAndUpdate({ _id: id }, { text: editedComment });
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const postDeleteComment = async (req, res) => {
  const {
    body: { commentId, photoId },
  } = req;
  try {
    await Comment.findOneAndDelete({ _id: commentId });
    const photo = await Photo.findById(photoId).populate("comments");
    photo.comments.pull({ _id: commentId });
    photo.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const getEditPhoto = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const photo = await Photo.findById(id);
    if (photo.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      res.render("editPhoto", {
        pageTitle: `Edit: ${photo.description}`,
        photo,
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const postEditPhoto = async (req, res) => {
  const {
    params: { id },
    body: { description },
  } = req;
  try {
    await Photo.findOneAndUpdate({ _id: id }, { description });
    res.redirect(routes.photoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const deletePhoto = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    //TO DO : uploads/photos 디렉토리 안에 남는 파일 삭제하기
    const photo = await Photo.findById(id);
    if (photo.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      await Photo.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
