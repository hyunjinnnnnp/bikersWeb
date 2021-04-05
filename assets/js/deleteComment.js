import axios from "axios";

let selectedBtn;
let deletedList;
let parent;
let photoId;
let commentNumberElem;
let descriptionContainer;
let index;

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

const hideElement = () => {
  const remained = parent.querySelectorAll(".comment-block");
  console.log(remained);
  if (remained.length === 2) {
    if (remained.nextSibling) {
      //남은 엘리먼트 1.페이크 2.남은 엘림 3.?
      //지워진 다음이라서 언디파인-_-
      index = 1;
      //뒤에 엘림이 있다면 [1]
      //없으면 마지막이니까 [2]
    } else {
      index = 0;
    }
    console.log(descriptionContainer.querySelectorAll(".comment-block")[index]);
  } else if (remained.length === 1) {
    console.log(descriptionContainer.querySelector(".comment-block"));
  }

  console.log(descriptionContainer.querySelectorAll(".comment-block"));
  //length가 1이라면 description에서 블럭 찾아서 지우기
  //2면 쿼리셀렉 올, 인덱스로 지우기

  parent.removeChild(deletedList);
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
      hideElement();
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteCommentBtnHandler = (event) => {
  event.preventDefault();
  [, , , , deletedList, parent] = event.path;
  selectedBtn = event.currentTarget;

  const targetCommentUrl = selectedBtn.getAttribute("data-url");
  deleteComment(targetCommentUrl);
};
function deleteCommentInit(id, elem) {
  commentNumberElem = elem;
  descriptionContainer = commentNumberElem.parentNode.parentNode;
  photoId = id;
  const deleteBtns = document.querySelectorAll("#jsDeleteComment");
  deleteBtns.forEach((btn) =>
    btn.addEventListener("click", deleteCommentBtnHandler)
  );
}

export default deleteCommentInit;
