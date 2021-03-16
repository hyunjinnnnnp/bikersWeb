import routes from "../routes";
import Photo from "../models/Photo";

export const home = async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.render("home", {
      pageTitle: "Home",
      photos,
    });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", photos: [] });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", {
    pageTitle: "Search",
    searchingBy,
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
  // TO DO : DB에 저장시키기
  const newPhoto = await Photo.create({
    fileUrl: path,
    description,
  });
  console.log(newPhoto);
  res.redirect(routes.photoDetail(newPhoto.id));
};
export const photoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const photo = await Photo.findById({ _id: id });
    // TO DO : ID 받아오기
    res.render("photoDetail", {
      pageTitle: `ID: ${photo.description}`,
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
    res.render("editPhoto", { pageTitle: "Edit", photo });
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
    res.redirect(rotes.home);
  }
};
export const deletePhoto = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    //TO DO : uploads/photos 디렉토리 안에 남는 파일 삭제하기
    await Photo.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
