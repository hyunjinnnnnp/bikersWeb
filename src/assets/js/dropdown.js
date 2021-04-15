const dropDowns = document.querySelectorAll("#jsDropDown");
let currentTarget;

const handleDropDownClick = (event) => {
  currentTarget = event.currentTarget;
  const dropBtn = currentTarget.querySelector("i");
  const dropDownContent = currentTarget.querySelector("#jsDropDownContent");
  dropDownContent.classList.toggle("dropdown-show");
  window.addEventListener("click", (e) => {
    if (e.target !== dropBtn) {
      if (dropDownContent.classList.contains("dropdown-show"))
        dropDownContent.classList.remove("dropdown-show");
    }
  });
};

function init() {
  dropDowns.forEach((item) =>
    item.addEventListener("click", handleDropDownClick)
  );
}
if (dropDowns) {
  init();
}
