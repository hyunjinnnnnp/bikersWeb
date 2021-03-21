import axios from "axios";

const addCommentForm = document.querySelector("#jsAddComment");
const commentList = document.querySelector("#jsCommentList");
const commentNumber = document.querySelector("#jsCommentNumber");
const avatarElement = document.querySelector("#jsAvatarElement");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};
const addComment = (comment) => {
  const avatarUrl = avatarElement.getAttribute("src");
  const li = document.createElement("li");
  const img = document.createElement("img");
  const span = document.createElement("span");
  img.setAttribute("src", avatarUrl);
  span.innerHTML = comment;
  li.appendChild(img);
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const photoId = window.location.pathname.split("/")[2];
  const response = await axios({
    url: `/api/${photoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}
if (addCommentForm) {
  init();
}
