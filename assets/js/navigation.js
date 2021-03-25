const dropDown = document.querySelector("#jsDropDown");
const dropDownContent = dropDown.querySelector("#jsDropDownContent");

const handleHover = (event) => {
  // event.preventDefault();
  // event.stopPropagation();
  dropDownContent.classList.toggle("dropdown-show");
  const [a] = event.path;
  if (a.tagName === `A`) {
    console.log(event.path);
  }
};

function init() {
  dropDown.addEventListener("click", handleHover);
}

if (dropDown) {
  init();
}
