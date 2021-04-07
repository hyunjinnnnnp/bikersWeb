import axios from "axios";
import editCommentInit from "./editComment";
import deleteCommentInit from "./deleteComment";

const COMMENT_LIST_CLASS = ".comment-list__container";
const PHOTO_BLOCK_CLASS = ".comment-list__fake-container";
let commentId;
let photoId;
let commentNumberElem;
let number;

const increaseNumber = () => {
  if (number) {
    commentNumberElem.innerHTML = `댓글 ${
      parseInt(number, 10) + 1
    }개 모두 보기`;
  } else if (!number) {
    commentNumberElem.innerHTML = `댓글 1개`;
  }
};

const drawFakeElem = (comment) => {
  const photoBlockTarget = commentNumberElem.parentNode.parentNode.querySelector(
    PHOTO_BLOCK_CLASS
  );
  const modalBlockTarget = document.querySelector(COMMENT_LIST_CLASS);
  const fakeCommentBlock = modalBlockTarget
    .querySelector("#jsFakeBlock .comment-block")
    .cloneNode(true);
  const link = fakeCommentBlock.querySelector(".column__link");
  const editBtn = fakeCommentBlock.querySelector("#jsEditComment");
  const deleteBtn = fakeCommentBlock.querySelector("#jsDeleteComment");
  const currentComment = fakeCommentBlock.querySelector("#jsCurrentComment");
  const timestamp = fakeCommentBlock.querySelector("#jsTimestamp");
  timestamp.innerText = "방금 전";
  const editCommentInput = fakeCommentBlock.querySelector(
    "#jsEditCommentForm input"
  );
  const postEditUrl = `/api/${commentId}/edit-comment`;
  const postDelUrl = `/api/${commentId}/delete-comment`;

  fakeCommentBlock.addEventListener("click", (event) => event.preventDefault());
  fakeCommentBlock.classList.remove("hide-element");
  fakeCommentBlock.classList.add("comment-block");
  currentComment.innerText = comment;
  editCommentInput.value = comment;
  link.setAttribute("href", "/me");
  editBtn.setAttribute("data-comment-id", postEditUrl);
  deleteBtn.setAttribute("data-comment-id", postDelUrl);
  if (modalBlockTarget.querySelectorAll("li").length <= 3) {
    photoBlockTarget.appendChild(fakeCommentBlock);
  }
  modalBlockTarget.appendChild(fakeCommentBlock);
  editCommentInit();
  deleteCommentInit(photoId);
};

const addComment = (comment) => {
  [, commentNumberElem] = document.querySelectorAll(
    `[data-photo-id='${photoId}']`
  );
  if (commentNumberElem.innerText) {
    const [, string] = commentNumberElem.innerText.split(" ");
    [number] = string.split("");
  } else {
    number = "0";
  }
  drawFakeElem(comment);
};

const sendComment = async (comment, id) => {
  photoId = id;
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
      increaseNumber(photoId);
    }
  });
};

const handleSubmit = (event, fakeElem, id) => {
  event.preventDefault();
  photoId = id;
  const input = fakeElem.querySelector("#jsAddComment input");
  const comment = input.value;
  sendComment(comment, photoId);
  input.value = "";
};

export default handleSubmit;
