import axios from "axios";

import handleSubmit from "./addComment";
import deleteCommentInit from "./deleteComment";
import editCommentInit from "./editComment";

const modalBtns = document.querySelectorAll("#jsCommentModal");
const main = document.querySelector("main");
const COMMENT_LIST_CLASS = "comment-list";

const addComment = (fakeElem, photoId, commentNumberElem) => {
  const elem = commentNumberElem;
  const addCommentForm = fakeElem.querySelector("#jsAddComment");
  addCommentForm.addEventListener("submit", (event) =>
    handleSubmit(event, fakeElem, photoId, elem)
  );
};
const handleModal = async (e) => {
  const [, , , photoBlock] = e.path;
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
        fakeElem.className = COMMENT_LIST_CLASS;
        fakeElem.innerHTML = response.data;
        main.appendChild(fakeElem);
      })
      .then(() => {
        const goBackBtn = fakeElem.querySelector("#jsGoBackPage");
        goBackBtn.addEventListener("click", () => {
          main.removeChild(fakeElem);
        });
        editCommentInit(photoBlock);
        deleteCommentInit(photoId, commentNumberElem);
        addComment(fakeElem, photoId, commentNumberElem);
      });
  } catch (error) {
    console.log(error);
  }
};

if (modalBtns) {
  modalBtns.forEach((btn) => btn.addEventListener("click", handleModal));
}

export default handleModal;
