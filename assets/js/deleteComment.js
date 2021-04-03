import axios from "axios";

const deleteBtns = document.querySelectorAll("#jsDeleteComment");
let selectedBtn;
let targetPhotoBlock;
let deletedList;
let parent;

const decreaseNumber = () => {
  const commentNumberElem = targetPhotoBlock.querySelector("#jsCommentNumber");
  const number = commentNumberElem.innerText.split(" ")[1];
  commentNumberElem.innerText = `댓글 ${parseInt(number, 10) - 1}`;
};
const hideElement = () => {
  parent.removeChild(deletedList);
  decreaseNumber();
};
const deleteComment = async (targetCommentUrl) => {
  const commentId = targetCommentUrl.split("/")[2];
  const url = targetCommentUrl;
  const photoId = window.location.pathname.split("/")[2];
  try {
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
  } catch (error) {
    console.log(error);
  }
};
const deleteHandler = (event) => {
  event.preventDefault();
  [, , , , deletedList, parent, targetPhotoBlock] = event.path;
  selectedBtn = event.currentTarget;
  const targetCommentUrl = selectedBtn.getAttribute("data-url");
  deleteComment(targetCommentUrl);
};
// function init() {
//   deleteBtns.forEach((elem) => elem.addEventListener("click", handleClick));
// }
// if (deleteBtns) {
//   init();
// }

// fake comment
// eslint-disable-next-line import/prefer-default-export
export default deleteHandler;
