import axios from "axios";

const editCommentElems = document.querySelectorAll("#jsEditComment");
const fakeCommentHome = document.querySelectorAll(
  ".comment-list__fake-container"
);
let selectedList;
let editForm;
let currentComment;
let editIcon;
let deleteIcon;
let commentId;

const editPhotoBlock = (editedComment) => {
  //photoBlock
  const modalBlock = document.querySelectorAll(".comment-list__container li");
  if (modalBlock.length <= 3) {
    const target = document.querySelector(
      `[data-comment-id="/api/${commentId}/edit-comment"]`
    );
    target.parentNode.parentNode.querySelector(
      "#jsCurrentComment"
    ).innerText = editedComment;
    target.parentNode.parentNode.querySelector(
      "#jsEditCommentForm input"
    ).value = editedComment;
  }
};
const editFakeBlock = (editedComment) => {
  currentComment.innerHTML = editedComment;
  currentComment.classList.remove("hide-element");
  currentComment.classList.add("show-element");
  editForm.classList.remove("show-element");
  editForm.classList.add("hide-element");
  editIcon.classList.remove("hide-element");
  editIcon.classList.add("show-element");
  deleteIcon.classList.remove("hide-element");
  deleteIcon.classList.add("show-element");
};
const sendEditedComment = async (editedComment) => {
  const btn = selectedList.querySelector("#jsEditComment");
  const editCommentUrl = btn.getAttribute("data-comment-id");
  [, , commentId] = editCommentUrl.split("/");
  const response = await axios({
    url: editCommentUrl,
    method: "POST",
    data: {
      editedComment,
      id: commentId,
    },
  });
  if (response.status === 200) {
    editFakeBlock(editedComment);
    editPhotoBlock(editedComment);
  }
};
const handleEditCommentForm = (event) => {
  event.preventDefault();
  const commentInput = editForm.querySelector("input");
  const editedComment = commentInput.value;
  sendEditedComment(editedComment);
  commentInput.value = "";
};
const toggleShowing = (elem) => {
  if (elem.classList.contains("show-element")) {
    elem.classList.remove("show-element");
    elem.classList.add("hide-element");
  } else if (elem.classList.contains("hide-element")) {
    elem.classList.remove("hide-element");
    elem.classList.add("show-element");
  }
};
const handleEditCommentBtn = (event) => {
  event.preventDefault();
  [, , , , selectedList] = event.path;
  editForm = selectedList.querySelector("#jsEditCommentForm");
  currentComment = selectedList.querySelector("#jsCurrentComment");
  editIcon = event.currentTarget;
  deleteIcon = editIcon.nextSibling;
  currentComment.innerHTML = "";
  toggleShowing(editForm);
  toggleShowing(currentComment);
  toggleShowing(editIcon);
  toggleShowing(deleteIcon);
  editForm.addEventListener("submit", handleEditCommentForm);
};
function editCommentInit(editCommentBtns) {
  if (editCommentElems) {
    editCommentElems.forEach((item) =>
      item.addEventListener("click", handleEditCommentBtn)
    );
  }
  if (editCommentBtns) {
    editCommentBtns.forEach((item) =>
      item.addEventListener("click", handleEditCommentBtn)
    );
  }
}
if (fakeCommentHome) {
  editCommentInit();
}
export default editCommentInit;
