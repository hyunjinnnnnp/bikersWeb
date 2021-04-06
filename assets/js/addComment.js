import axios from "axios";
import editCommentInit from "./editComment";
import deleteCommentInit from "./deleteComment";

let commentId;
let photoId;
let commentNumberElem;

const increaseNumber = () => {
  const number = commentNumberElem.innerText.split(" ")[1];
  if (number) {
    commentNumberElem.innerHTML = `댓글 ${
      parseInt(number, 10) + 1
    }개 모두 보기`;
  } else if (!number) {
    commentNumberElem.innerHTML = `댓글 1개`;
  } else if (number === "0") {
    commentNumberElem.innerHTML = "";
  }
};

const COMMENT_LIST_CLASS = ".comment-list__container";
const PHOTO_BLOCK_CLASS = ".comment-list__fake-container";

const drawFakeElem = (comment, targetClass, target) => {
  // length 3이상이면 커맨트리스트에만 추가
  // 2까지는 두군대 다 보내야함
  const fakeCommentBlock = document
    .querySelector("#jsFakeBlock .comment-block")
    .cloneNode(true);
  const link = fakeCommentBlock.querySelector(".column__link");
  const editBtn = fakeCommentBlock.querySelector("#jsEditComment");
  const deleteBtn = fakeCommentBlock.querySelector("#jsDeleteComment");
  const currentComment = fakeCommentBlock.querySelector("#jsCurrentComment");
  const editCommentInput = fakeCommentBlock.querySelector(
    "#jsEditCommentForm input"
  );
  const postEditUrl = `/api/${commentId}/edit-comment`;
  const postDelUrl = `/api/${commentId}/delete-comment`;
  if (target) {
    console.log(comment, postEditUrl, postDelUrl);
    target.querySelector(targetClass).appendChild(fakeCommentBlock);
  } else {
    document.querySelector(targetClass).appendChild(fakeCommentBlock);
  }
  fakeCommentBlock.addEventListener("click", (event) => event.preventDefault());
  fakeCommentBlock.classList.remove("hide-element");
  fakeCommentBlock.classList.add("comment-block");
  currentComment.innerText = comment;
  editCommentInput.value = comment;
  link.setAttribute("href", "/me");
  editBtn.setAttribute("data-url", postEditUrl);
  deleteBtn.setAttribute("data-url", postDelUrl);
  editCommentInit();
  deleteCommentInit(photoId, commentNumberElem);
};

const addComment = (comment) => {
  const numberStr = commentNumberElem.innerText.split(" ")[1];
  let number;
  if (numberStr) {
    [number] = numberStr;
  }
  if (!number || (number > "0" && number < "3")) {
    const currentTargetBlock = commentNumberElem.parentNode.parentNode;
    console.log(currentTargetBlock);
    drawFakeElem(comment, PHOTO_BLOCK_CLASS, currentTargetBlock);
  }
  drawFakeElem(comment, COMMENT_LIST_CLASS);
};

const sendComment = async (comment, id) => {
  photoId = id;
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
      increaseNumber(photoId);
    }
  });
};

const handleSubmit = (event, fakeElem, id, elem) => {
  commentNumberElem = elem;
  photoId = id;
  event.preventDefault();
  const input = fakeElem.querySelector("#jsAddComment input");
  const comment = input.value;
  sendComment(comment, photoId);
  input.value = "";
};

export default handleSubmit;
