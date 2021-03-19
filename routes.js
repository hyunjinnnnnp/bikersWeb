//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
const ME = "/me";
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

//kakao
const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";
//google
const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";
//naver
const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";

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
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  me: ME,
};

export default routes;
