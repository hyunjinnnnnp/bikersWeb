//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
const ME = "/me";
const LIKE_LIST = "/like-list";
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_DETAIL = "/:id";
const USER_PHOTOS = "/:id/photos";

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

//api
const API = "/api";
const ADD_COMMENT = "/:id/comment";
const EDIT_COMMENT = "/:id/edit-comment";
const DELETE_COMMENT = "/:id/delete-comment";
const GET_USER_LOC = "/:id/get-user-locations";
const TOOGLE_LIKE = "/:id/like";
const COMMENTS = "/comments";
const COMMENT_LIST = "/:id/comments-list";

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
  userPhotos: (id) => {
    if (id) {
      return `/users/${id}/photos`;
    } else {
      return USER_PHOTOS;
    }
  },
  likeList: LIKE_LIST,
  comments: COMMENTS,
  commentList: (id) => {
    if (id) {
      return `/api/${id}/comments-list`;
    } else {
      return COMMENT_LIST;
    }
  },
  photos: PHOTOS,
  upload: UPLOAD,
  editPhoto: (id) => {
    if (id) {
      return `/photos/${id}/edit`;
    } else {
      return EDIT_PHOTO;
    }
  },
  photoDetail: (id) => {
    if (id) {
      return `/photos/${id}`;
    } else {
      return PHOTO_DETAIL;
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
  api: API,
  addComment: ADD_COMMENT,
  editComment: (id) => {
    if (id) {
      return `/${id}/edit-comment`;
    } else {
      return EDIT_COMMENT;
    }
  },
  deleteComment: (id) => {
    if (id) {
      return `/${id}/delete-comment`;
    } else {
      return DELETE_COMMENT;
    }
  },
  getUserLocations: (id) => {
    if (id) {
      return `/${id}/get-user-locations`;
    } else {
      return GET_USER_LOC;
    }
  },
  toggleLike: (id) => {
    if (id) {
      return `/${id}/like`;
    } else {
      return TOOGLE_LIKE;
    }
  },
};

export default routes;
