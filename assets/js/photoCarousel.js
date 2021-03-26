const photoDetailCarousel = document.querySelector("#jsPhotoDetailCarousel");
const photoBlocks = document.querySelectorAll(".photoBlock");

let targetBlock;
let nextBtn;
let prevBtn;
const IMG_CLASS_NAME = "carousel__photo";
const HIDE = "carousel__btn-hide";
const SHOW = "carousel__btn-show";

let targetBtn;
let imgs;
let oldActived;
let activedElem;

const toggleBtn = () => {
  if (activedElem === activedElem.parentNode.firstChild) {
    //첫번째 사진일 때
    if (prevBtn.classList.contains(SHOW)) {
      prevBtn.classList.remove(SHOW);
    }
    prevBtn.classList.add(HIDE);
    if (nextBtn.classList.contains(HIDE)) {
      nextBtn.classList.remove(HIDE);
    }
    nextBtn.classList.add(SHOW);
  } else if (activedElem === activedElem.parentNode.lastChild) {
    //마지막 인덱스 라면
    prevBtn = nextBtn.previousSibling;
    if (prevBtn.classList.contains(HIDE)) {
      prevBtn.classList.remove(HIDE);
    }
    prevBtn.classList.add(SHOW);
    if (nextBtn.classList.contains(SHOW)) {
      nextBtn.classList.remove(SHOW);
    }
    nextBtn.classList.add(HIDE);
  } else {
    prevBtn = nextBtn.previousSibling;
    nextBtn = prevBtn.nextSibling;
    if (prevBtn.classList.contains(HIDE)) {
      prevBtn.classList.remove(HIDE);
      prevBtn.classList.add(SHOW);
    }
    if (nextBtn.classList.contains(HIDE)) {
      nextBtn.classList.remove(HIDE);
      nextBtn.classList.add(SHOW);
    }
  }
};

const moveNext = () => {
  oldActived = targetBlock.querySelector(".active");
  if (oldActived.previousSibling) {
    oldActived.previousSibling.className = IMG_CLASS_NAME;
  }
  oldActived.className = IMG_CLASS_NAME;
  activedElem = oldActived.nextSibling;
  activedElem.className = `${IMG_CLASS_NAME} active`;
  if (activedElem !== activedElem.parentNode.lastChild) {
    activedElem.nextSibling.className = `${IMG_CLASS_NAME} next`;
  }
  if (activedElem !== activedElem.parentNode.firstChild) {
    activedElem.previousSibling.className = `${IMG_CLASS_NAME} prev`;
  }
  toggleBtn();
};

const movePrev = () => {
  oldActived = targetBlock.querySelector(".active");
  oldActived.className = IMG_CLASS_NAME;
  activedElem = oldActived.previousSibling;
  activedElem.className = `${IMG_CLASS_NAME} active`;
  if (activedElem !== activedElem.parentNode.firstChild) {
    activedElem.previousSibling.className = `${IMG_CLASS_NAME} prev`;
  }
  if (activedElem !== activedElem.parentNode.lastChild) {
    activedElem.nextSibling.className = `${IMG_CLASS_NAME} next`;
  }
  toggleBtn();
};

const handleClick = (event) => {
  [targetBtn, targetBlock] = event.path;
  if (targetBtn.classList.contains("carousel__prev-i")) {
    prevBtn = targetBtn;
    movePrev();
  }
  if (targetBtn.classList.contains("carousel__next-i")) {
    nextBtn = targetBtn;
    moveNext();
  }
};
const photoBlockCaseInit = () => {
  photoBlocks.forEach((block) => {
    imgs = block.querySelectorAll(".carousel__photo");
    if (imgs.length > 1) {
      imgs[0].classList.add("active");
      imgs[1].classList.add("next");
    }
    const icons = block.querySelectorAll("i");
    icons.forEach((item) => item.addEventListener("click", handleClick));
  });
};
const photoDetailCaseInit = () => {
  imgs = photoDetailCarousel.querySelectorAll(".carousel__photo");
  if (imgs.length > 1) {
    imgs[0].classList.add("active");
    imgs[1].classList.add("next");
  }
  const icons = photoDetailCarousel.querySelectorAll("i");
  icons.forEach((item) => item.addEventListener("click", handleClick));
};
if (photoBlocks) {
  photoBlockCaseInit();
}
if (photoDetailCarousel) {
  photoDetailCaseInit();
}
