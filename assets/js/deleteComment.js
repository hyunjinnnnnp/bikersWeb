import axios from "axios";

let selectedBtn;
let targetListBlock;
let targetUl;
let photoId;
let commentNumberElem;
let targetPhotoBlock;

const decreaseNumber = () => {
  const number = commentNumberElem.innerText.split(" ")[1];
  if (number) {
    commentNumberElem.innerText = `댓글 ${
      parseInt(number, 10) - 1
    }개 모두 보기`;
    if (number === "1개") {
      commentNumberElem.innerHTML = "";
    }
  }
};
//comment-list 에서 찍히면 photoBlock에서 지운다
// 인덱스 2or 3 (페이크 블럭 떄문에)
// 지워지기 전에 인덱스를 체크하고 지워야함
const hideElement = (id) => {
  const commentId = id;
  const targetParent = targetPhotoBlock.querySelector(
    ".comment-list__fake-container"
  );
  const target = targetParent.querySelector(
    `[data-url="/api/${commentId}/edit-comment"]`
  );
  const remained = targetUl.querySelectorAll(".comment-block");
  if (target && remained.length <= 4) {
    const block = target.parentNode.parentNode.parentNode;
    block.parentNode.removeChild(block);
  }

  targetUl.removeChild(targetListBlock);
  decreaseNumber();
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
  const targetCommentUrl = selectedBtn.getAttribute("data-url");
  deleteComment(targetCommentUrl);
};
function deleteCommentInit(id, elem) {
  commentNumberElem = elem;
  targetPhotoBlock = commentNumberElem.parentNode.parentNode;
  photoId = id;
  const deleteBtns = document.querySelectorAll("#jsDeleteComment");
  deleteBtns.forEach((btn) =>
    btn.addEventListener("click", deleteCommentBtnHandler)
  );
}

export default deleteCommentInit;
