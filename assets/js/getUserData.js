const userProfileWrapper = document.querySelector(".user-profile__wrapper");

const init = () => {
  fetch("/api/get-user-info")
    .then((json) => {
      console.log(json);
    })
    .catch((err) => console.log(err));
};

if (userProfileWrapper) {
  init();
}
