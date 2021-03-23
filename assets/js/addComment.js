import axios from "axios";

const addCommentForms = document.querySelectorAll("#jsAddComment");

let targetPhotoBlock;

const increaseNumber = () => {
  const commentNumber = targetPhotoBlock.querySelector("#jsCommentNumber");
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};
const addComment = (comment) => {
  const avatarElement = document.querySelector("#jsAvatarElement");
  const avatarUrl = avatarElement.getAttribute("src");
  const commentList = targetPhotoBlock.querySelector("#jsCommentList");
  const li = document.createElement("li");
  const img = document.createElement("img");
  //TO DO : 작성자 이름 추가 클래스 추가
  // const name = document.createElement("span");
  const span = document.createElement("span");
  img.setAttribute("src", avatarUrl);
  img.classList.add("author-avatar");
  li.classList.add("fake-comment");
  span.innerHTML = comment;
  li.appendChild(img);
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const urlPath = window.location.pathname;
  let photoId;
  if (urlPath === "/") {
    const a = targetPhotoBlock.querySelector("a");
    // eslint-disable-next-line prefer-destructuring
    photoId = a.getAttribute("href").split("/")[2];
  } else {
    // eslint-disable-next-line prefer-destructuring
    photoId = window.location.pathname.split("/")[2];
  }
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
  const currentInput = event.currentTarget.querySelector("input");
  targetPhotoBlock = currentInput.parentNode.parentNode.parentNode;
  const comment = currentInput.value;
  sendComment(comment);
  currentInput.value = "";
};

function init() {
  addCommentForms.forEach((form) =>
    form.addEventListener("submit", handleSubmit)
  );
}
if (addCommentForms) {
  init();
}
