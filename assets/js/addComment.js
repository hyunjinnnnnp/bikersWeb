import axios from "axios";
import editHandler from "./editComment";
import deleteHandler from "./deleteComment";

const addCommentForms = document.querySelectorAll("#jsAddComment");
let photoId;
let targetPhotoBlock;
let commentId;

const increaseNumber = () => {
  const commentNumber = targetPhotoBlock.querySelector("#jsCommentNumber");
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
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
    .querySelector(".author-avatar")
    .setAttribute("src", userAvatar);
  fakeCommentBlock.querySelector(".author-name").innerHTML = userName;
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
  const urlPath = window.location.pathname;
  if (urlPath === "/") {
    const a = targetPhotoBlock.querySelector(".carousel__img-list");
    // eslint-disable-next-line prefer-destructuring
    photoId = a.getAttribute("href").split("/photos/")[1];
  } else {
    // eslint-disable-next-line prefer-destructuring
    photoId = window.location.pathname.split("/")[2];
  }
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
