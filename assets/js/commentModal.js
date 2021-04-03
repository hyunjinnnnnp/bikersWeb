import axios from "axios";

const modalBtns = document.querySelectorAll("#jsCommentModal");
const main = document.querySelector("main");

const handleModal = async (e) => {
  const photoId = e.target.getAttribute("data-photo-id");
  const url = `/api/${photoId}/comments-list`;
  let fakeElem;
  try {
    await axios({
      url,
      method: "POST",
      data: { photoId },
    })
      .then((response) => {
        fakeElem = document.createElement("div");
        fakeElem.className = "comment-list";
        fakeElem.innerHTML = response.data;
        main.appendChild(fakeElem);
      })
      .then(() => {
        // const goBackBtn = document.querySelector("#jsGoBackPage");

        // goBackBtn.addEventListener("click", () => {
        //   main.removeChild(fakeElem);
        // });
        console.log("hi");
      });
  } catch (error) {
    console.log(error);
  }
};

if (modalBtns) {
  modalBtns.forEach((btn) => btn.addEventListener("click", handleModal));
}
