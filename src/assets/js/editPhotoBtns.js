const navContainer = document.querySelectorAll(".info__edit-photo");

const { body } = document;

const NAV_CLASS = "edit-photo__nav";
const HIDE_CLASS = "jsHide";
const SHOW_CLASS = "jsShow";
const OVERFLOW_HIDDEN = "overflow-hidden";

const disableEditPhotoNav = (navigator) => {
  const nav = navigator;
  nav.className = `${NAV_CLASS} ${HIDE_CLASS}`;
  body.classList.remove(OVERFLOW_HIDDEN);
};

const enableEditPhotoNav = (event) => {
  const [, , photoBlockHeader] = event.path;
  const nav = photoBlockHeader.querySelector(".edit-photo__nav");
  const disableBtn = document.querySelector(".jsCancelBtn");
  nav.className = `${NAV_CLASS} ${SHOW_CLASS}`;
  body.classList.add(OVERFLOW_HIDDEN);
  disableBtn.addEventListener("click", () => disableEditPhotoNav(nav));
};

function editPhotoNavInit() {
  const ellipsisBtns = document.querySelectorAll(".info__edit-photo i");
  ellipsisBtns.forEach((item) =>
    item.addEventListener("click", enableEditPhotoNav)
  );
}
if (navContainer) {
  editPhotoNavInit();
}
