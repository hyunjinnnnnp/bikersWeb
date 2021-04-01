import axios from "axios";

//유저 정보가 있을 때만 클릭 이벤트

//포토 디테일은 다루지 않을 것임.
//포토디테일 라우터 막고 업로드했을 때 홈으로 가게 바꿀 거야
//preventDefault떄문에 슬라이더도 막혔음

const photoBlocks = document.querySelectorAll(".photoBlock");
let targetPhotoBlock;

const SHOW_CLASS = "jsShow";
const HIDE_CLASS = "jsHide";
const TRUE_CLASS = "xi-heart";
const FALSE_CLASS = "xi-heart-o";

const decreaseNumber = () => {
  const likesCount = targetPhotoBlock.querySelector("#jsLikesCount");
  likesCount.innerText = parseInt(likesCount.innerText, 10) - 1;
};
const showFalseBtn = () => {
  const parent = targetPhotoBlock.querySelector(".photoBlock__description");
  const trueIndicator = targetPhotoBlock.querySelector("#jsTrueIndicator");
  let falseIndicator = targetPhotoBlock.querySelector("#jsFalseIndicator");
  if (!falseIndicator) {
    falseIndicator = document.createElement("i");
    parent.prepend(falseIndicator);
    falseIndicator.id = "jsFalseIndicator";
  }
  trueIndicator.className = `${TRUE_CLASS} ${HIDE_CLASS}`;
  falseIndicator.className = `${FALSE_CLASS} ${SHOW_CLASS}`;
  decreaseNumber();
};

const increaseNumber = () => {
  const likesCount = targetPhotoBlock.querySelector("#jsLikesCount");
  likesCount.innerText = parseInt(likesCount.innerText, 10) + 1;
};
const showTrueIndicator = () => {
  const parent = targetPhotoBlock.querySelector(".photoBlock__description");
  const falseIndicator = targetPhotoBlock.querySelector("#jsFalseIndicator");
  let trueIndicator = targetPhotoBlock.querySelector("#jsTrueIndicator");
  if (!trueIndicator) {
    trueIndicator = document.createElement("i");
    trueIndicator.id = "jsTrueIndicator";
    parent.prepend(trueIndicator);
  }
  trueIndicator.className = `${TRUE_CLASS} ${SHOW_CLASS}`;
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
  const photoLink = targetPhotoBlock
    .querySelector(".carousel__img-list")
    .getAttribute("href");
  const photoId = photoLink.split("/photos/")[1];
  const response = await axios({
    url: `api/${photoId}/like`,
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
  [, , , targetPhotoBlock] = e.path;
  postLikeData();
};
function addLikeInit() {
  const userId = document.querySelector("#userId");
  photoBlocks.forEach((photoBlock) => {
    photoBlock.addEventListener("click", (e) => e.preventDefault());
    if (userId) {
      photoBlock.addEventListener("dblclick", handleLikeClick);
    }
  });
}
if (photoBlocks) {
  addLikeInit();
}
