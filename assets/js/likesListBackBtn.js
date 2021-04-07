const likesBackBtn = document.querySelector(".jsLikesBackBtn");

function init() {
  likesBackBtn.addEventListener("click", () => {
    window.history.back();
    console.log("hi");
  });
}
if (likesBackBtn) {
  init();
}
