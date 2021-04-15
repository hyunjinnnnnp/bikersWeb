import axios from "axios";

const fakeCommentHome = document.querySelectorAll(
  ".comment-list__fake-container"
);
const deleteBtns = document.querySelectorAll("#jsDeleteComment");
let selectedBtn;
let currentModalList;
let photoId;

const decreaseNumber = () => {
  const numberElemParent = document.querySelectorAll(
    `[data-photo-id='${photoId}']`
  )[1];
  const numberElem = numberElemParent.querySelector("#jsCommentNumber");
  const number = numberElem.innerText.split(" ")[1].split("")[0];

  if (number > "2") {
    numberElem.innerText = `댓글 ${parseInt(number, 10) - 1}개 모두 보기`;
  } else if (number === "2") {
    numberElem.innerHTML = "댓글 1개 보기";
  } else if (number === "1") {
    numberElem.innerHTML = "";
  }
};

const hidePhotoBlockElement = (id) => {
  const commentId = id;
  const photoBlockEdit = document.querySelector(
    `[data-comment-id="/api/${commentId}/delete-comment"]`
  );
  const photoBlockTargetList = photoBlockEdit.parentNode.parentNode.parentNode;
  const photoBlockUl = photoBlockTargetList.parentNode;
  const photoBlockDescription = photoBlockUl.parentNode;
  const photoBlockListLength = photoBlockUl.querySelectorAll(".comment-block")
    .length;
  if (photoBlockListLength > 0 && photoBlockListLength < 3) {
    photoBlockTargetList.classList.add("jsHide");
  }
  decreaseNumber(photoBlockDescription);
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
      hidePhotoBlockElement(commentId);
      currentModalList.classList.add("jsHide");
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteCommentBtnHandler = (event) => {
  event.preventDefault();
  [, selectedBtn, , , currentModalList] = event.path;
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
if (fakeCommentHome) {
  deleteBtns.forEach((btn) =>
    btn.addEventListener("click", deleteCommentBtnHandler)
  );
}
export default deleteCommentInit;
