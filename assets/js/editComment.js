import axios from "axios";

const editCommentElems = document.querySelectorAll("#jsEditComment");
let selectedList;
let editForm;
let currentComment;
let editIcon;
let deleteIcon;
let photoBlock;
let currentCommentBlockContainer;

const editFakeBlock = (editedComment) => {
  let index;
  currentComment.innerHTML = editedComment;
  currentComment.classList.remove("hide-element");
  currentComment.classList.add("show-element");
  editForm.classList.remove("show-element");
  editForm.classList.add("hide-element");
  editIcon.classList.remove("hide-element");
  editIcon.classList.add("show-element");
  deleteIcon.classList.remove("hide-element");
  deleteIcon.classList.add("show-element");
  if (currentCommentBlockContainer.className === "comment-list__container") {
    if (selectedList.nextSibling) {
      index = 0;
    } else {
      index = 1;
    }
    const array = photoBlock.querySelectorAll(".comment-block");

    if (array.length === 1) {
      photoBlock.querySelector("#jsCurrentComment").innerHTML = editedComment;
      const input = selectedList.querySelector("#jsEditCommentForm input");
      input.value = editedComment;
    } else {
      const nthChild = array[index];
      nthChild.querySelector("#jsCurrentComment").innerHTML = editedComment;
      const input = selectedList.querySelector("#jsEditCommentForm input");
      input.value = editedComment;
    }
  }
};
const sendEditedComment = async (editedComment) => {
  const btn = selectedList.querySelector("#jsEditComment");
  const editCommentUrl = btn.getAttribute("href");
  const response = await axios({
    url: editCommentUrl,
    method: "POST",
    data: {
      editedComment,
    },
  });
  if (response.status === 200) {
    editFakeBlock(editedComment);
  }
};
const handleEditCommentForm = (event) => {
  event.preventDefault();
  [, , , currentCommentBlockContainer] = event.path;
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
  toggleShowing(editForm);
  toggleShowing(currentComment);
  toggleShowing(editIcon);
  toggleShowing(deleteIcon);
  editForm.addEventListener("submit", handleEditCommentForm);
};
function editCommentInit(elem) {
  photoBlock = elem;
  if (editCommentElems) {
    editCommentElems.forEach((item) =>
      item.addEventListener("click", handleEditCommentBtn)
    );
  }
}

export default editCommentInit;
