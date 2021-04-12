import axios from "axios";
import editCommentInit from "./editComment";
import deleteCommentInit from "./deleteComment";

const COMMENT_LIST_CLASS = ".comment-list__container";
const PHOTO_BLOCK_CLASS = ".comment-list__fake-container";
let commentId;
let photoId;
let commentNumberElem;

const increaseNumber = (elem) => {
  commentNumberElem = elem.querySelector("#jsCommentNumber");
  if (commentNumberElem.innerText === "") {
    commentNumberElem.innerText = `댓글 1개`;
  } else {
    const number = commentNumberElem.innerText.split(" ")[1];
    commentNumberElem.innerText = `댓글 ${
      parseInt(number, 10) + 1
    }개 모두 보기`;
  }
};

const cloneFakeElem = (comment, targetBlock) => {
  const fakeCommentBlock = document
    .querySelector("#jsFakeBlock .comment-block")
    .cloneNode(true);
  const editBtn = fakeCommentBlock.querySelector("#jsEditComment");
  const deleteBtn = fakeCommentBlock.querySelector("#jsDeleteComment");
  const currentComment = fakeCommentBlock.querySelector("#jsCurrentComment");
  const timestamp = fakeCommentBlock.querySelector("#jsTimestamp");
  if (targetBlock.className === "comment-list__fake-container") {
    const imgContainer = fakeCommentBlock.querySelector(
      ".comment-block__column"
    );
    const imgLink = imgContainer.querySelector(".column__link");
    imgContainer.removeChild(imgLink);
  }
  timestamp.innerText = "방금 전";
  const editCommentInput = fakeCommentBlock.querySelector(
    ".jsEditCommentForm input"
  );
  const postEditUrl = `/api/${commentId}/edit-comment`;
  const postDelUrl = `/api/${commentId}/delete-comment`;

  fakeCommentBlock.classList.remove("hide-element");
  fakeCommentBlock.classList.add("comment-block");
  currentComment.innerText = comment;
  editCommentInput.value = comment;
  editBtn.setAttribute("data-comment-id", postEditUrl);
  deleteBtn.setAttribute("data-comment-id", postDelUrl);
  targetBlock.appendChild(fakeCommentBlock);
  const fakeCommentEditBtns = document.querySelectorAll("#jsEditComment");
  editCommentInit(fakeCommentEditBtns);
  const fakeCommentDelBtns = document.querySelectorAll("#jsDeleteComment");
  deleteCommentInit(photoId, fakeCommentDelBtns);
};

const addComment = (comment) => {
  const [, elem] = document.querySelectorAll(`[data-photo-id='${photoId}']`);

  const photoBlockTarget = elem.parentNode.parentNode.querySelector(
    PHOTO_BLOCK_CLASS
  );
  const modalBlockTarget = document.querySelector(COMMENT_LIST_CLASS);

  if (modalBlockTarget.querySelectorAll("li").length < 3) {
    cloneFakeElem(comment, modalBlockTarget);
    cloneFakeElem(comment, photoBlockTarget);
  } else {
    cloneFakeElem(comment, modalBlockTarget);
  }
  increaseNumber(elem);
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
    }
  });
};

const handleSubmit = (event, fakeElem, id) => {
  event.preventDefault();
  const modalContainer = fakeElem;
  photoId = id;
  const input = modalContainer.querySelector("#jsAddComment input");
  const comment = input.value;
  sendComment(comment, photoId);
  input.value = "";
};

export default handleSubmit;
