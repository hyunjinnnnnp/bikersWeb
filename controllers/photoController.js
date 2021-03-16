export const search = (req, res) => {
  res.render("search", {
    pageTitle: "Search",
  });
};
export const upload = (req, res) => {
  res.render("upload", {
    pageTitle: "Upload Photo",
  });
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
