import axios from "axios";
import editCommentInit from "./editComment";
import deleteCommentInit from "./deleteComment";

const photoBlockForms = document.querySelectorAll(".photo-block__form");
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
let timeOutId;
const modalScrollTo = (targetBlock) => {
  const container = targetBlock;
  container.scrollTop = container.scrollHeight;
  clearTimeout(timeOutId);
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
  fakeCommentBlock.classList.add("jsNewComment");
  currentComment.innerText = comment;
  editCommentInput.value = comment;
  editBtn.setAttribute("data-comment-id", postEditUrl);
  deleteBtn.setAttribute("data-comment-id", postDelUrl);
  targetBlock.appendChild(fakeCommentBlock);
  timeOutId = setTimeout(() => modalScrollTo(targetBlock), 500);
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

const sendComment = async (comment) => {
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
  sendComment(comment);
  input.value = "";
};

//PHOTOBLOCK SUBMIT
const waitForElement = (id, callback) => {
  const intervalId = setInterval(() => {
    if (document.getElementById(id)) {
      clearInterval(intervalId);
      callback();
    }
  }, 100);
};
const photoBlockSubmit = (comment) => {
  waitForElement("jsAddComment", () => {
    const modalForm = document.querySelector("#jsAddComment");
    const modalInput = modalForm.querySelector("input");
    modalInput.value = comment;
    modalForm.requestSubmit();
    modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      sendComment(comment);
      modalInput.value = "";
    });
  });
};
if (photoBlockForms) {
  photoBlockForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      const [, , targetPhotoBlock] = event.path;
      const photoBlockInput = targetPhotoBlock.querySelector(
        ".jsAddComment input"
      );
      photoId = targetPhotoBlock
        .querySelector(".carousel__img-list")
        .getAttribute("data-url");
      const modalClickBtn = targetPhotoBlock.querySelector("#jsCommentNumber");
      const comment = photoBlockInput.value;
      photoBlockInput.value = "";
      event.preventDefault();
      modalClickBtn.click();
      photoBlockSubmit(comment);
    });
  });
}

export default handleSubmit;
