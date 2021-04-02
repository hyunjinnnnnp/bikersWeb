import axios from "axios";
import editHandler from "./editComment";
import deleteHandler from "./deleteComment";

const addCommentForms = document.querySelectorAll("#jsAddComment");
let targetPhotoBlock;
let commentId;

const increaseNumber = () => {
  console.log(targetPhotoBlock);
  const commentNumberElem = targetPhotoBlock.querySelector("#jsCommentNumber");

  const number = commentNumberElem.innerText.split(" ")[1];
  commentNumberElem.innerHTML = `댓글 ${parseInt(number, 10) + 1}`;
};
//TO DO : Refactoring..... 쿼리셀렉터 다 올리기
const addComment = (comment) => {
  const postEditUrl = `/api/${commentId}/edit-comment`;
  const postDelUrl = `/api/${commentId}/delete-comment`;
  const userName = document.querySelector("#userName").innerText;
  const userAvatar = document.querySelector("#userAvatar").getAttribute("src");
  const fakeCommentBlock = document
    .querySelector("#jsFakeBlock")
    .cloneNode(true);
  fakeCommentBlock.addEventListener("click", (event) => event.preventDefault());
  targetPhotoBlock.querySelector("#jsCommentList").prepend(fakeCommentBlock);
  fakeCommentBlock.classList.remove("hide-element");
  fakeCommentBlock.classList.add("commentBlock");
  fakeCommentBlock
    .querySelector(".commentBlock__link")
    .setAttribute("href", "/me");
  fakeCommentBlock
    .querySelector(".author--avatar")
    .setAttribute("src", userAvatar);
  fakeCommentBlock.querySelector(".author--name").innerHTML = userName;
  fakeCommentBlock.querySelector("#jsCurrentComment").innerText = comment;
  fakeCommentBlock.querySelector("#jsEditCommentForm input").value = comment;
  fakeCommentBlock
    .querySelector("#jsEditComment")
    .setAttribute("href", postEditUrl);

  fakeCommentBlock
    .querySelector("#jsDeleteComment")
    .setAttribute("href", postDelUrl);
  fakeCommentBlock
    .querySelector("#jsEditComment")
    .addEventListener("click", editHandler);
  fakeCommentBlock
    .querySelector("#jsDeleteComment")
    .addEventListener("click", deleteHandler);
  increaseNumber();
};

const sendComment = async (comment) => {
  const photoId = targetPhotoBlock
    .querySelector(".carousel__img-list")
    .getAttribute("data-url");
  await axios({
    url: `/api/${photoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  }).then((res) => {
    if (res.status === 200) {
      commentId = res.data;
      addComment(comment);
    }
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  const currentInput = event.currentTarget.querySelector("input");
  [, , targetPhotoBlock] = event.path;
  const comment = currentInput.value;
  sendComment(comment);
  currentInput.value = "";
};

function init() {
  addCommentForms.forEach((form) =>
    form.addEventListener("submit", handleSubmit)
  );
}
if (addCommentForms) {
  init();
}
