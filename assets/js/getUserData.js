import axios from "axios";

const userProfileWrapper = document.querySelector(".user-profile__wrapper");

const init = () => {
  axios("/api/get-user-info")
    .then((res) => {
      if (res.status === 200) {
        const userLocations = res.data;
        console.log(res, userLocations);
      }
    })
    .catch((err) => console.log(err));
};

if (userProfileWrapper) {
  init();
}
