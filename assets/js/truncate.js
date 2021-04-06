import handleModal from "./commentModal";

const photoDescriptions = document.querySelectorAll("#jsTruncate");

const truncateInit = () => {
  photoDescriptions.forEach((text) => {
    const textElem = text;
    const description = textElem.innerText;
    const limit = 25;
    if (description.length > limit) {
      const truncated = description.slice(0, limit);
      const moreTxt = description.slice(limit, description.length);
      textElem.innerText = `${truncated} ...`;
      const moreBtns = document.createElement("span");
      moreBtns.innerText = "더 보기";
      textElem.appendChild(moreBtns);
      moreBtns.id = "jsMoreBtn";
      textElem.addEventListener("click", (e) => {
        const { currentTarget } = e;
        currentTarget.innerText = `${truncated}${moreTxt}`;
        textElem.id = "jsCommentModal";
        textElem.addEventListener("click", handleModal);
      });
    } else {
      textElem.id = "jsCommentModal";
      textElem.addEventListener("click", handleModal);
    }
  });
};

if (photoDescriptions) {
  truncateInit();
}
