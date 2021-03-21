import axios from "axios";

const deleteBtns = document.querySelectorAll("#jsDeleteComment");
let selectedBtn;
const commentNumber = document.querySelector("#jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerText = parseInt(commentNumber.innerText, 10) - 1;
};
const hideElement = () => {
  const deletedList = selectedBtn.parentNode;
  deletedList.parentNode.removeChild(deletedList);
  decreaseNumber();
};
const deleteComment = async (url) => {
  const commentId = url.split("/")[2];
  const photoId = window.location.pathname.split("/")[2];
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