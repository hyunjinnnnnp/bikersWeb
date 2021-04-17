const photoBlocks = document.querySelectorAll(".photo-block");
const photoEdit = document.querySelector(".edit-photo");

let targetBlock;
let nextBtn;
let prevBtn;
const IMG_CLASS_NAME = "carousel__photo";
const HIDE = "carousel__btn-hide";
const SHOW = "carousel__btn-show";

let touchStartX;
let touchEndX;

let targetBtn;
let oldActived;
let activedElem;

const toggleBtn = () => {
  if (activedElem === activedElem.parentNode.firstChild) {
    if (prevBtn.classList.contains(SHOW)) {
      prevBtn.classList.remove(SHOW);
    }
    prevBtn.classList.add(HIDE);
    if (nextBtn.classList.contains(HIDE)) {
      nextBtn.classList.remove(HIDE);
    }
    nextBtn.classList.add(SHOW);
  } else if (activedElem === activedElem.parentNode.lastChild) {
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

const carouselClickHandler = (event) => {
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
const touchStart = (event) => {
  touchStartX = event.touches[0].pageX;
};
const touchEnd = (event) => {
  touchEndX = event.changedTouches[0].pageX;
  const nextbtn = event.target.querySelector("carousel__next-i");
  const prevbtn = event.target.querySelector("carousel__prev-i");
  if (nextbtn && touchStartX > touchEndX) {
    moveNext();
  } else if (prevbtn && touchStartX < touchEndX) {
    movePrev();
  }
};
const multipleBlocksCaseInit = () => {
  photoBlocks.forEach((block) => {
    const imgs = block.querySelectorAll(".carousel__photo");
    const icons = block.querySelectorAll("i");
    if (imgs.length >= 2) {
      imgs[0].classList.add("active");
      imgs[1].classList.add("next");
      icons.forEach((item) =>
        item.addEventListener("click", carouselClickHandler)
      );
      photoBlocks.forEach((item) => {
        item.addEventListener("touchstart", touchStart);
        item.addEventListener("touchend", touchEnd);
      });
    } else if (imgs.length === 1) {
      icons.forEach((item) => item.classList.remove(SHOW));
    }
  });
};
const singleBlockCaseInit = (carouselContainer) => {
  const imgs = carouselContainer.querySelectorAll(".carousel__photo");
  const icons = carouselContainer.querySelectorAll("i");
  if (imgs.length >= 2) {
    imgs[0].classList.add("active");
    imgs[1].classList.add("next");
    icons.forEach((item) => {
      item.addEventListener("click", carouselClickHandler);
    });
  } else if (imgs.length === 1) {
    icons.forEach((item) => item.classList.remove(SHOW));
  }
};

if (photoBlocks) {
  multipleBlocksCaseInit();
}
if (photoEdit) {
  const carouselContainer = document.querySelector(".img__carousel-container");
  const textarea = document.querySelector("textarea");
  singleBlockCaseInit(carouselContainer);
  window.onload = () => {
    textarea.select();
  };
}
export default singleBlockCaseInit;
