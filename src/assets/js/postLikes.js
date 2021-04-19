import axios from "axios";
// setTimeout 2000 => 타겟 외에 다른 요소에도 영향이 감
const userInfo = document.querySelector("#jsUserInfo");
const photoBlocks = document.querySelectorAll(".photo-block");
let targetPhotoBlock;
let isClicked = true;
let dbtapped = false;

const SHOW_CLASS = "jsShow";
const HIDE_CLASS = "jsHide";
const TRUE_CLASS = "xi-heart";
const FALSE_CLASS = "xi-heart-o";
const RED_CLASS = "red";

const decreaseNumber = () => {
  const likesCount = targetPhotoBlock.querySelector("#jsLikesCount");
  likesCount.innerText = ` ${parseInt(likesCount.innerText, 10) - 1}개`;
};
const showFalseBtn = () => {
  const trueIndicator = targetPhotoBlock.querySelector("#jsTrueIndicator");
  const falseIndicator = targetPhotoBlock.querySelector("#jsFalseIndicator");
  trueIndicator.className = `${TRUE_CLASS} ${HIDE_CLASS}`;
  falseIndicator.className = `${FALSE_CLASS} ${SHOW_CLASS}`;
  decreaseNumber();
};
const increaseNumber = () => {
  const likesCount = targetPhotoBlock.querySelector("#jsLikesCount");
  likesCount.innerText = ` ${parseInt(likesCount.innerText, 10) + 1}개`;
};
const showTrueIndicator = () => {
  const falseIndicator = targetPhotoBlock.querySelector("#jsFalseIndicator");
  const trueIndicator = targetPhotoBlock.querySelector("#jsTrueIndicator");
  trueIndicator.className = `${TRUE_CLASS} ${SHOW_CLASS} ${RED_CLASS}`;
  falseIndicator.className = `${FALSE_CLASS} ${HIDE_CLASS}`;
  increaseNumber();
};

const showOverlayBtn = () => {
  const FALSE_ELEM = targetPhotoBlock.querySelector("#jsLikedFalse");
  FALSE_ELEM.classList.remove("jsHide");
  FALSE_ELEM.classList.add("likes-fade-out");
  FALSE_ELEM.addEventListener("animationend", () => {
    FALSE_ELEM.classList.add("jsHide");
    FALSE_ELEM.classList.remove("likes-fade-out");
  });
};
const postLikeData = async () => {
  const photoId = targetPhotoBlock
    .querySelector(".carousel__img-list")
    .getAttribute("data-url");

  const response = await axios({
    url: `/api/${photoId}/like`,
    method: "POST",
    data: { photoId },
  });
  if (response.status === 200) {
    const isLiked = response.data;
    if (isLiked) {
      showOverlayBtn();
      showTrueIndicator();
    } else {
      showFalseBtn();
    }
  }
};
const handleLikeClick = (e) => {
  targetPhotoBlock = e.currentTarget;
  if (isClicked) {
    postLikeData();
    isClicked = false;
    setTimeout(() => {
      isClicked = true;
    }, 2000);
  }
};

const touchHandler = (e) => {
  if (!dbtapped) {
    dbtapped = true;
    setTimeout(() => {
      dbtapped = false;
    }, 300);
    return false;
  }
  return handleLikeClick(e);
};

if (photoBlocks && userInfo) {
  photoBlocks.forEach((photoBlock) => {
    photoBlock.addEventListener("dblclick", handleLikeClick);
    photoBlock.addEventListener("touchstart", touchHandler);
  });
} else if (photoBlocks.length === 1) {
  photoBlocks.addEventListener("dblclick", handleLikeClick);
  photoBlocks.addEventListener("touchstart", touchHandler);
}
