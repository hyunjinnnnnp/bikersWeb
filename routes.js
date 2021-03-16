//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_DETAIL = "/:id";

//Photos
const PHOTOS = "/photos";
const UPLOAD = "/upload";
const PHOTO_DETAIL = "/:id";
const EDIT_PHOTO = "/:id/edit";
const DELETE_PHOTO = "/:id/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  photos: PHOTOS,
  upload: UPLOAD,
  photoDetail: (id) => {
    if (id) {
      return `/photos/${id}`;
    } else {
      return PHOTO_DETAIL;
    }
  },
  editPhoto: (id) => {
    if (id) {
      return `/photos/${id}/edit`;
    } else {
      return EDIT_PHOTO;
    }
  },
  deletePhoto: (id) => {
    if (id) {
      return `/photos/${id}/delete`;
    } else {
      return DELETE_PHOTO;
    }
  },
};

export default routes;