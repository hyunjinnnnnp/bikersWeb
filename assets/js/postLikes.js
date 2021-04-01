import axios from "axios";

//유저 정보가 있을 때만 클릭 이벤트

//포토 디테일은 다루지 않을 것임.
//포토디테일 라우터 막고 업로드했을 때 홈으로 가게 바꿀 거야
//preventDefault떄문에 슬라이더도 막혔음

const photoBlocks = document.querySelectorAll(".photoBlock");

let targetPhotoBlock;

const decreaseNumber = () => {
  const likesCount = targetPhotoBlock.querySelector("#jsLikesCount");
  likesCount.innerText = parseInt(likesCount.innerText, 10) - 1;
};
const changeIndicatorBtn = () => {
  const TRUE_ELEM = targetPhotoBlock.querySelector("#jsTrueIndicator");
  const parent = TRUE_ELEM.parentNode;
  parent.removeChild(TRUE_ELEM);
  const falseIndicator = document.createElement("i");
  parent.prepend(falseIndicator);
  falseIndicator.className = "xi-heart-o";
  falseIndicator.id = "jsFalseIndicator";
  decreaseNumber();
};

const increaseNumber = () => {
  const likesCount = targetPhotoBlock.querySelector("#jsLikesCount");
  likesCount.innerText = parseInt(likesCount.innerText, 10) + 1;
};
const changeIndicator = () => {
  const falseIndicator = targetPhotoBlock.querySelector("#jsFalseIndicator");
  const trueIndicator = document.createElement("i");
  trueIndicator.className = "xi-heart";
  trueIndicator.id = "jsTrueIndicator";
  const parent = falseIndicator.parentNode;
  parent.prepend(trueIndicator);
  parent.removeChild(falseIndicator);
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
  changeIndicator();
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
    console.log(response.data);
    if (isLiked) {
      showOverlayBtn();
    } else {
      changeIndicatorBtn();
    }
  }
};
const handleLikeClick = (e) => {
  [, , , targetPhotoBlock] = e.path;
  postLikeData();
};
function addLikeInit() {
  photoBlocks.forEach((photoBlock) => {
    photoBlock.addEventListener("click", (e) => e.preventDefault());
    photoBlock.addEventListener("dblclick", handleLikeClick);
  });
}
if (photoBlocks) {
  addLikeInit();
}
