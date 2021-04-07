const likesBackBtn = document.querySelector(".jsLikesBackBtn");

function init() {
  likesBackBtn.addEventListener("click", () => {
    window.history.back();
  });
}
if (likesBackBtn) {
  init();
}
