import axios from "axios";

import handleSubmit from "./addComment";
import deleteCommentInit from "./deleteComment";
import editCommentInit from "./editComment";
import drawTime from "./timestamp";

const loggedUser = document.querySelector("#jsUserInfo");
const body = document.querySelector("body");
const modalBtns = document.querySelectorAll("#jsCommentModal");
const main = document.querySelector("main");
const COMMENT_MODAL = "comment-modal";
const OVERFLOW_HIDDEN = "overflow-hidden";

const addComment = (fakeElem, photoId, commentNumberElem) => {
  const elem = commentNumberElem;
  const addCommentForm = fakeElem.querySelector("#jsAddComment");
  addCommentForm.addEventListener("submit", (event) =>
    handleSubmit(event, fakeElem, photoId, elem)
  );
};

const disableModal = (fakeElem) => {
  body.classList.remove(OVERFLOW_HIDDEN);
  main.removeChild(fakeElem);
};
const enableModal = (elem) => {
  // const commentListContainer = document.querySelector(
  //   ".comment-list__container"
  // );
  const fakeElem = elem;
  const timestamps = fakeElem.querySelectorAll("#jsTimestamp");
  timestamps.forEach((item) => {
    const timestamp = item;
    const date = drawTime(item);
    timestamp.innerText = date;
  });
  main.appendChild(fakeElem);
  body.classList.add(OVERFLOW_HIDDEN);
  const goBackBtn = fakeElem.querySelector("#jsGoBackPage");
  goBackBtn.addEventListener("click", () => {
    disableModal(fakeElem);
  });
};
const handleModal = async (e) => {
  const commentNumberElem = e.path[1].querySelector(".comment-number");
  const photoId = e.currentTarget.getAttribute("data-photo-id");
  const url = `/api/${photoId}/comments-list`;
  let fakeElem;
  try {
    await axios({
      url,
      method: "POST",
      data: { photoId },
    })
      .then((response) => {
        fakeElem = document.createElement("div");
        fakeElem.className = COMMENT_MODAL;
        fakeElem.innerHTML = response.data;
        enableModal(fakeElem);
      })
      .then(() => {
        if (loggedUser) {
          const modalEditComments = document.querySelectorAll("#jsEditComment");
          const deleteBtns = document.querySelectorAll("#jsDeleteComment");
          deleteCommentInit(photoId, deleteBtns);
          addComment(fakeElem, photoId, commentNumberElem);
          editCommentInit(modalEditComments);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

if (modalBtns) {
  modalBtns.forEach((btn) => btn.addEventListener("click", handleModal));
}

export default handleModal;
