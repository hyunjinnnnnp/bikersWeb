const photoBlocks = document.querySelectorAll(".photo-block");
const photoEdit = document.querySelector(".edit-photo");

let carouselTargetBlock;
let nextBtn;
let prevBtn;
const IMG_CLASS_NAME = "carousel__photo";
const HIDE = "carousel__btn-hide";
const SHOW = "carousel__btn-show";

let carouselTargetBtn;
let oldActived;
let activedElem;

let touchStartX;
let touchEndX;

const toggleBtn = () => {
  // console.log(activedElem, activedElem.parentNode.firstChild);
  // 엑티브 앨렘이 첫번째 자식이라면
  // 이전 버튼을 활성화시킨다

  if (activedElem === activedElem.parentNode.firstChild) {
    if (prevBtn.classList.contains(SHOW)) {
      prevBtn.classList.remove(SHOW);
    }
    prevBtn.classList.add(HIDE);

    // ㄴㅔㄱ스트버튼에 관해서 여기서 왜 해??
    if (nextBtn.classList.contains(HIDE)) {
      nextBtn.classList.remove(HIDE);
    }
    nextBtn.classList.add(SHOW);

    // 엑티브 엘렘이 마지막 자식이라면
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
  oldActived = carouselTargetBlock.querySelector(".active");
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
  oldActived = carouselTargetBlock.querySelector(".active");
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
  [carouselTargetBtn, carouselTargetBlock] = event.path;
  if (carouselTargetBtn.classList.contains("carousel__prev-i")) {
    prevBtn = carouselTargetBtn;
    movePrev();
  }
  if (carouselTargetBtn.classList.contains("carousel__next-i")) {
    nextBtn = carouselTargetBtn;
    moveNext();
  }
};

const touchStart = (event) => {
  touchStartX = event.touches[0].pageX;
};
const touchEnd = (event) => {
  touchEndX = event.changedTouches[0].pageX;
  let targetPhotoBlock;
  [, carouselTargetBlock, , targetPhotoBlock] = event.path;
  prevBtn = targetPhotoBlock.querySelector(".carousel__prev-i");
  nextBtn = targetPhotoBlock.querySelector(".carousel__next-i");
  if (touchStartX > touchEndX) {
    moveNext();
  } else if (touchStartX < touchEndX) {
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
      block.addEventListener("touchstart", touchStart);
      block.addEventListener("touchend", touchEnd);
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
