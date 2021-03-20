import routes from "../routes";
import Photo from "../models/Photo";

export const home = async (req, res) => {
  try {
    const photos = await Photo.find({}).sort({ _id: -1 }).populate("creator");
    res.render("home", {
      pageTitle: "Home",
      photos,
    });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", photos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let photos = [];
  try {
    photos = await Photo.find({
      description: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }

  res.render("search", {
    pageTitle: "Search",
    searchingBy,
    photos,
  });
};
export const getUpload = (req, res) => {
  res.render("upload", {
    pageTitle: "Upload Photo",
  });
};
export const postUpload = async (req, res) => {
  const {
    body: { description },
    file: { path },
  } = req;
  const newPhoto = await Photo.create({
    fileUrl: path,
    description,
    creator: req.user.id,
  });
  req.user.photos.push(newPhoto.id);
  req.user.save();
  res.redirect(routes.photoDetail(newPhoto.id));
};
export const photoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const photo = await Photo.findById(id).populate("creator");
    res.render("photoDetail", {
      pageTitle: `${photo.creator.name}: ${photo.description}`,
      photo,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
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
