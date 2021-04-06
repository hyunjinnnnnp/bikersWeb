const ellipsisBtns = document.querySelectorAll(".info__edit-photo i");
const nav = document.querySelector(".edit-photo__nav");
const body = document.querySelector("body");
const NAV_CLASS = "edit-photo__nav";
const HIDE_CLASS = "jsHide";
const SHOW_CLASS = "jsShow";
const OVERFLOW_HIDDEN = "overflow-hidden";
let navTop;

const disableNav = () => {
  nav.className = `${NAV_CLASS} ${HIDE_CLASS}`;
  body.classList.remove(OVERFLOW_HIDDEN);
};

const enableNav = () => {
  const disableBtn = document.querySelector(".jsCancelBtn");
  nav.className = `${NAV_CLASS} ${SHOW_CLASS}`;
  nav.style.top = `${navTop}px`;
  disableBtn.addEventListener("click", disableNav);
  body.classList.add(OVERFLOW_HIDDEN);
};
const getYOffset = () => {
  navTop = window.pageYOffset;
};

function init() {
  ellipsisBtns.forEach((item) => item.addEventListener("click", enableNav));
  document.addEventListener("scroll", getYOffset);
}

if (ellipsisBtns) {
  init();
}
