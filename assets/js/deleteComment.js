import axios from "axios";

const deleteBtns = document.querySelectorAll("#jsDeleteComment");
let selectedBtn;
let targetPhotoBlock;
let deletedList;
let parent;

const decreaseNumber = () => {
  const commentNumber = targetPhotoBlock.querySelector("#jsCommentNumber");
  commentNumber.innerText = parseInt(commentNumber.innerText, 10) - 1;
};
const hideElement = () => {
  parent.removeChild(deletedList);
  decreaseNumber();
};
const deleteComment = async (url) => {
  const commentId = url.split("/")[2];
  const photoId = targetPhotoBlock
    .querySelector(".carousel__img-list")
    .getAttribute("data-url");
  const response = await axios({
    url,
    method: "POST",
    data: {
      commentId,
      photoId,
    },
  });
  if (response.status === 200) {
    hideElement();
  }
};
const handleClick = (event) => {
  event.preventDefault();
  [, , , , deletedList, parent, targetPhotoBlock] = event.path;
  selectedBtn = event.currentTarget;
  const targetCommentUrl = selectedBtn.getAttribute("href");
  deleteComment(targetCommentUrl);
};
function init() {
  deleteBtns.forEach((elem) => elem.addEventListener("click", handleClick));
}
if (deleteBtns) {
  init();
}
// eslint-disable-next-line import/prefer-default-export
export default handleClick;
