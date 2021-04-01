import axios from "axios";

//유저 정보가 있을 때만 클릭 이벤트

//포토 디테일은 다루지 않을 것임.
//포토디테일 라우터 막고 업로드했을 때 홈으로 가게 바꿀 거야

const photoArray = document.querySelectorAll(".carousel__container");
const userId = document.querySelector("#userId");

let targetPhotoBlock;
let FALSE_ELEM;
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
  FALSE_ELEM.classList.remove("jsHide");
  FALSE_ELEM.classList.add("likes-fade-out");
  FALSE_ELEM.addEventListener("animationend", () => {
    FALSE_ELEM.classList.add("jsHide");
    FALSE_ELEM.classList.remove("likes-fade-out");
  });
  changeIndicator();
};

const sendData = async () => {
  const photoLink = targetPhotoBlock
    .querySelector(".carousel__img-list")
    .getAttribute("href");
  const photoId = photoLink.split("/photos/")[1];
  const response = await axios({
    url: `api/${photoId}/add-like`,
    method: "POST",
    data: { photoId },
  });
  if (response.status === 200) {
    showOverlayBtn();
  }
};
const handleDblClick = (e) => {
  [, , , targetPhotoBlock] = e.path;
  FALSE_ELEM = targetPhotoBlock.querySelector("#jsLikedFalse");
  if (FALSE_ELEM) {
    sendData();
  }
};

function init() {
  photoArray.forEach((photo) => {
    photo.addEventListener("click", (e) => e.preventDefault());
    if (userId) {
      photo.addEventListener("dblclick", handleDblClick);
    }
  });
}
if (photoArray) {
  init();
}
