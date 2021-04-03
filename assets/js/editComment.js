import axios from "axios";

const editCommentElems = document.querySelectorAll("#jsEditComment");
let selectedList;
let editForm;
let currentComment;
let editIcon;
let deleteIcon;

const edit = (editedComment) => {
  const parent = selectedList.querySelector(".commentBlock__contents");
  const span = document.createElement("span");
  span.innerHTML = editedComment;
  parent.appendChild(span);
  editForm.classList.remove("show-element");
  editForm.classList.add("hide-element");
  editIcon.classList.remove("hide-element");
  editIcon.classList.add("show-element");
  deleteIcon.classList.remove("hide-element");
  deleteIcon.classList.add("show-element");
};
const sendComment = async (editedComment) => {
  const btn = selectedList.querySelector("#jsEditComment");
  const editCommentUrl = btn.getAttribute("data-url");
  const response = await axios({
    url: editCommentUrl,
    method: "POST",
    data: {
      editedComment,
    },
  });
  if (response.status === 200) {
    edit(editedComment);
  }
};
const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = editForm.querySelector("input");
  const editedComment = commentInput.value;
  sendComment(editedComment);
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
const handleClick = (event) => {
  event.preventDefault();
  selectedList = event.currentTarget.parentNode.parentNode;
  editForm = selectedList.querySelector("#jsEditCommentForm");
  currentComment = selectedList.querySelector("#jsCurrentComment");
  editIcon = event.currentTarget;
  deleteIcon = editIcon.nextSibling;
  toggleShowing(editForm);
  toggleShowing(currentComment);
  toggleShowing(editIcon);
  toggleShowing(deleteIcon);
  editForm.addEventListener("submit", handleSubmit);
};
function init() {
  editCommentElems.forEach((item) =>
    item.addEventListener("click", handleClick)
  );
}
if (editCommentElems) {
  init();
}
// eslint-disable-next-line import/prefer-default-export
export default handleClick;
