const navContainer = document.querySelectorAll(".info__edit-photo");

const { body } = document;

let editPhotoNav;
const NAV_CLASS = "edit-photo__nav";
const HIDE_CLASS = "jsHide";
const SHOW_CLASS = "jsShow";
const OVERFLOW_HIDDEN = "overflow-hidden";

const disableEditPhotoNav = () => {
  editPhotoNav.className = `${NAV_CLASS} ${HIDE_CLASS}`;
  body.classList.remove(OVERFLOW_HIDDEN);
};

const enableEditPhotoNav = (event) => {
  const [, photoBlockHeader] = event.path;
  editPhotoNav = photoBlockHeader.querySelector(".edit-photo__nav");
  const disableBtn = photoBlockHeader.querySelector(".jsCancelBtn");
  editPhotoNav.className = `${NAV_CLASS} ${SHOW_CLASS}`;
  body.classList.add(OVERFLOW_HIDDEN);
  disableBtn.addEventListener("click", disableEditPhotoNav);
  disableBtn.addEventListener("touchstart", disableEditPhotoNav);
};

function editPhotoNavInit() {
  const ellipsisBtns = document.querySelectorAll(".info__edit-photo");
  ellipsisBtns.forEach((item) => {
    item.addEventListener("click", enableEditPhotoNav);
    item.addEventListener("touchstart", enableEditPhotoNav);
  });
}
if (navContainer) {
  editPhotoNavInit();
}
