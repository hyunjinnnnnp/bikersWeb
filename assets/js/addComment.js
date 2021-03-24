import axios from "axios";

const addCommentForms = document.querySelectorAll("#jsAddComment");
let photoId;
let targetPhotoBlock;
let commentId;

const increaseNumber = () => {
  const commentNumber = targetPhotoBlock.querySelector("#jsCommentNumber");
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};
const addComment = (comment) => {
  const postEditUrl = `/api/${commentId}/edit-comment`;
  const postDelUrl = `/api/${commentId}/delete-comment`;
  const userName = document.querySelector("#userName").innerText;
  const userAvatar = document.querySelector("#userAvatar").getAttribute("src");
  const fakeCommentBlock = document
    .querySelector("#jsFakeBlock")
    .cloneNode(true);
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
  fakeCommentBlock.querySelector("#jsCurrentComment").innerText = comment; //바뀐 커맨트 내용
  fakeCommentBlock.querySelector("#jsEditCommentForm input").value = comment;
  fakeCommentBlock
    .querySelector("#jsEditComment")
    .setAttribute("href", postEditUrl);
  fakeCommentBlock
    .querySelector("#jsDeleteComment")
    .setAttribute("href", postDelUrl);
  increaseNumber();
};

const sendComment = async (comment) => {
  const urlPath = window.location.pathname;
  if (urlPath === "/") {
    const a = targetPhotoBlock.querySelector("a");
    // eslint-disable-next-line prefer-destructuring
    photoId = a.getAttribute("href").split("/")[2];
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
  //HOME: 커맨트 폼이 여러개임
  //PHOTO DETAIL: 커맨트 폼 하나밖에 없음
  addCommentForms.forEach((form) =>
    form.addEventListener("submit", handleSubmit)
  );
}
if (addCommentForms) {
  init();
}
