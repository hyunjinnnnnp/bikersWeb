const nextBtnList = document.querySelectorAll(".carousel__next-i");
const prevBtnList = document.querySelectorAll(".carousel__prev-i");

const carouselContainer = document.querySelector("#jsCarouselContainer");
let targetBlock;
let nextBtn;
let prevBtn;
const IMG_CLASS_NAME = "carousel__photo";
const NEXT_CLASS = "carousel__next-i";
const PREV_CLASS = "carousel__prev-i";
const HIDE = "carousel__btn-hide";
const SHOW = "carousel__btn-show";

let imgs;
let oldActived;
let activedElem;

const togglePrevBtn = () => {
  if (activedElem === activedElem.parentNode.firstChild) {
    //HIDE  //첫번쨰 사진이라면
    prevBtn.classList.remove(SHOW);
    prevBtn.classList.add(HIDE);
    //SHOW NEXT BUTTON
  } else {
    //SHOW
    nextBtn = prevBtn.nextSibling;
    if (nextBtn.classList.contains(HIDE)) {
      nextBtn.classList.remove(HIDE);
    }
    nextBtn.classList.add(SHOW);
  }
};
const toggleNextBtn = () => {
  if (activedElem === activedElem.parentNode.lastChild) {
    nextBtn.classList.remove(SHOW);
    nextBtn.classList.add(HIDE);
  } else {
    //SHOW
    prevBtn = nextBtn.previousSibling;
    if (prevBtn.classList.contains(HIDE)) {
      prevBtn.classList.remove(HIDE);
    }
    prevBtn.classList.add(SHOW);
  }
};
const moveNext = (event) => {
  [nextBtn, targetBlock] = event.path;
  oldActived = targetBlock.querySelector(".active");
  if (oldActived.previousSibling) {
    oldActived.previousSibling.className = IMG_CLASS_NAME;
  }
  oldActived.className = IMG_CLASS_NAME;
  activedElem = oldActived.nextSibling;
  activedElem.className = `${IMG_CLASS_NAME} active`;
  if (activedElem.nextSibling) {
    activedElem.nextSibling.className = `${IMG_CLASS_NAME} next`;
  }
  if (activedElem.previousSibling) {
    activedElem.previousSibling.className = `${IMG_CLASS_NAME} prev`;
  }
  toggleNextBtn();
};
const movePrev = (event) => {
  [prevBtn, targetBlock] = event.path;
  oldActived = targetBlock.querySelector(".active");
  oldActived.className = IMG_CLASS_NAME;
  activedElem = oldActived.previousSibling;
  activedElem.className = `${IMG_CLASS_NAME} active`;
  if (activedElem.previousSibling) {
    activedElem.previousSibling.className = `${IMG_CLASS_NAME} prev`;
  }
  if (activedElem.nextSibling) {
    activedElem.nextSibling.className = `${IMG_CLASS_NAME} next`;
  }
  togglePrevBtn();
};

const initializeClasses = () => {
  imgs = carouselContainer.querySelectorAll(".carousel__photo");
  imgs[0].classList.add("active");
  imgs[1].classList.add("next");
};

function init() {
  initializeClasses();
  prevBtnList.forEach((btn) => btn.addEventListener("click", movePrev));
  nextBtnList.forEach((btn) => btn.addEventListener("click", moveNext));
}
if (nextBtnList) {
  init();
}
