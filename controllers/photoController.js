import fs from "fs";
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
    res.render("home", { pageTitle: "Home", photos: [] });
  }
};
export const getPhotoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const photo = await Photo.findById(id)
    .populate("creator")
    .populate("comments")
    .populate("location");
  try {
    res.render("photoDetail", {
      pageTitle: `${photo.creator.name} : ${photo.description}`,
      photo,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const postToggleLike = async (req, res) => {
  const {
    body: { photoId },
    user: loggedUser,
  } = req;
  let isLiked;
  try {
    const photo = await Photo.findById(photoId);
    const user = await User.findById(loggedUser._id);
    if (loggedUser && !photo.likes.includes(user._id)) {
      isLiked = true;
      photo.likes.push(user._id);
      user.likes.push(photo._id);
      photo.save();
      user.save();
      res.json(isLiked);
    } else {
      isLiked = false;
      photo.likes.pull(user._id);
      user.likes.pull(photo._id);
      photo.save();
      user.save();
      res.json(isLiked);
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
export const search = async (req, res) => {
  const {
    user: loggedUser,
    query: { term: searchingBy },
  } = req;
  try {
    const photos = await Photo.find({
      description: { $regex: searchingBy, $options: "i" },
    })
      .sort({ _id: -1 })
      .populate("creator")
      .populate("comments")
      .populate("location");
    res.render("search", {
      pageTitle: "Search",
      searchingBy,
      photos,
      loggedUser,
    });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", photos: [], loggedUser });
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

  const fileUrl = files.map((file) => file.location);
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
    res.redirect(routes.photoDetail(newPhoto._id));
  } catch (error) {
    console.log(error);
  }
};

export const getCommentList = async (req, res) => {
  try {
    const {
      body: { photoId },
      user,
    } = req;
    let loggedUser;
    const photo = await Photo.findById({ _id: photoId })
      .populate("comments")
      .populate("creator");
    if (user) {
      loggedUser = (await User.findById({ _id: user._id })) || null;
    }
    res.render("commentList", { pageTitle: "Comments", photo, loggedUser });
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
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.photoDetail(id));
};
export const deletePhoto = async (req, res) => {
  const {
    params: { id: photoId },
  } = req;
  try {
    const photo = await Photo.findById(photoId)
      .populate("user")
      .populate("location")
      .populate("likes");
    // photo.fileUrl.forEach((url) => {
    //   fs.unlink(url, (error) => {
    //     if (error) console.log(error);
    //   });
    // });
    const user = await User.findById({ _id: req.user._id });
    const locationId = photo.location._id;
    const likedUsersId = photo.likes.map((like) => {
      return like.id;
    });
    if (photo.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      await Photo.findOneAndDelete({ _id: photoId });
      user.photos.pull(photoId);
      user.locations.pull(locationId);
      user.save();
      await Location.findOneAndDelete({ _id: locationId });
      photo.comments.forEach(async (comment) => {
        await Comment.findOneAndDelete({ _id: comment._id });
      });
      likedUsersId.forEach(async (id) => {
        const likedUser = await User.findById(id);
        likedUser.likes.pull(photoId);
        likedUser.save();
      });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
