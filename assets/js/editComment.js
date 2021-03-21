import axios from "axios";

const editCommentElems = document.querySelectorAll("#jsEditComment");

let selectedList;
let editForm;
let currentComment;
let editIcon;

const toggleShowing = (elem) => {
  if (elem.classList.contains("show-element")) {
    elem.classList.remove("show-element");
    elem.classList.add("hide-element");
  } else if (elem.classList.contains("hide-element")) {
    elem.classList.remove("hide-element");
    elem.classList.add("show-element");
  }
};

const edit = (editedComment) => {
  //   currentComment = `me: ${editedComment}`;
  console.log(editIcon, currentComment, editForm);
  //form 없애고 span 추가
  const elem = document.createElement("span");
  elem.innerHTML = editedComment;
  selectedList.insertBefore(elem, editIcon);
  editForm.classList.remove("show-element");
  editForm.classList.add("hide-element");
};

const sendComment = async (editedComment) => {
  const a = selectedList.querySelector("#jsEditComment");
  const url = a.getAttribute("href");
  const response = await axios({
    url,
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

const handleClick = (event) => {
  event.preventDefault();
  selectedList = event.currentTarget.parentNode;
  editForm = selectedList.querySelector("#jsEditCommentForm");
  currentComment = selectedList.querySelector("#jsCurrentComment");
  editIcon = event.currentTarget;
  toggleShowing(editForm);
  toggleShowing(currentComment);
  toggleShowing(editIcon);
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
