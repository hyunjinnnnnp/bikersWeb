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
export const postUpload = (req, res) => {
  const {
    body: { file, description },
  } = req;
  // TO DO : DB에 저장시키기
  res.redirect(routes.photoDetail(321323));
};
export const photoDetail = (req, res) => {
  res.render("photoDetail", {
    pageTitle: "Photo Detail",
  });
};
export const editPhoto = (req, res) => {
  res.render("editPhoto", {
    pageTitle: "Edit Photo",
  });
};
export const deletePhoto = (req, res) => {
  res.render("deletePhoto", {
    pageTitle: "Delete Photo",
  });
};
