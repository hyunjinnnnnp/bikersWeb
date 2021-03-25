const dropDown = document.querySelector("#jsDropDown");
const dropBtn = dropDown.querySelector("i");
const dropDownContent = dropDown.querySelector("#jsDropDownContent");

const handleHover = (event) => {
  dropDownContent.classList.toggle("dropdown-show");
  if (event.target !== dropBtn) {
    if (dropDownContent.classList.contains("drop-down-show"))
      dropDownContent.classList.remove("dropdown-show");
  }
};

function init() {
  window.addEventListener("click", handleHover);
}

if (dropDown) {
  init();
}
