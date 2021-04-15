const loggedUserId = document.querySelector("#userId");
const cogBtn = document.querySelector(".jsAccountEditBtn");

const enableCogModal = () => {
  const body = document.querySelector("body");
  const container = document.querySelector(".jsAccountEditContainer");
  const clone = container.cloneNode(true);
  clone.classList.remove("jsHide");
  clone.classList.add("clonedElem");
  body.appendChild(clone);
  let clonedElem = document.querySelector(".clonedElem");
  const disableBtn = document.querySelectorAll(".jsAccountEditCancelBtn")[1];
  disableBtn.addEventListener("click", () => {
    body.removeChild(clonedElem);
    clonedElem = null;
  });
};

const avatarToEllipsis = () => {
  const icon = document.querySelector(".jsAccountEditBtn");
  const avatar = document.querySelector("#userAvatar");
  avatar.classList.add("jsHide");
  icon.classList.remove("jsHide");
  cogBtn.addEventListener("click", enableCogModal);
};

if (window.location.pathname.includes("/users/")) {
  const [, , id] = window.location.pathname.split("/");
  if (id === loggedUserId.innerText) {
    avatarToEllipsis();
  }
}
if (window.location.pathname === "/me") {
  avatarToEllipsis();
}

const removeHeader = () => {
  const header = document.querySelector("header");
  header.classList.add("jsHide");
};

if (window.location.pathname === "/join") {
  removeHeader();
}
