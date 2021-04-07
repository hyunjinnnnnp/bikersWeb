import axios from "axios";

const deleteBtns = document.querySelectorAll("#jsDeleteComment");
let selectedBtn;
let targetListBlock;
let targetUl;
let photoId;

const decreaseNumber = (photoBlockParent) => {
  const commentNumberElem = photoBlockParent.parentNode.querySelector(
    "#jsCommentNumber"
  );
  const number = commentNumberElem.innerText.split(" ")[1];
  if (number) {
    commentNumberElem.innerText = `댓글 ${parseInt(number, 10) - 1}`;
    if (number === "1개") {
      commentNumberElem.innerHTML = "";
    }
  }
};
const hideElement = (id) => {
  const commentId = id;
  const target = document.querySelectorAll(
    `[data-comment-id="/api/${commentId}/edit-comment"]`
  );
  const photoBlockTarget = target[0].parentNode.parentNode.parentNode;
  const modalBlockTarget = target[1].parentNode.parentNode.parentNode;
  const modalBlockParent = modalBlockTarget.parentNode;
  const photoBlockParent = photoBlockTarget.parentNode;
  const modalBlock = document.querySelectorAll(".comment-list__container li");
  if (modalBlock.length <= 3) {
    photoBlockParent.removeChild(photoBlockTarget);
    modalBlockParent.removeChild(modalBlockTarget);
  }
  decreaseNumber(photoBlockParent);
};

const deleteComment = async (targetCommentUrl) => {
  const commentId = targetCommentUrl.split("/")[2];
  const url = targetCommentUrl;
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
      hideElement(commentId);
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteCommentBtnHandler = (event) => {
  event.preventDefault();
  [, selectedBtn, , , targetListBlock, targetUl] = event.path;
  const targetCommentUrl = selectedBtn.getAttribute("data-comment-id");
  deleteComment(targetCommentUrl);
};

function deleteCommentInit(id, modalBtns) {
  if (deleteBtns.legnth > 1) {
    photoId = id;
    deleteBtns.forEach((btn) =>
      btn.addEventListener("click", deleteCommentBtnHandler)
    );
  }
  if (modalBtns) {
    photoId = id;
    modalBtns.forEach((btn) =>
      btn.addEventListener("click", deleteCommentBtnHandler)
    );
  }
}

export default deleteCommentInit;
