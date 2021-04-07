const uploadForm = document.querySelector("#jsUploadFile");
const uploadInput = document.querySelector("#file");
const fileList = document.querySelector("#jsFileList");

function handleFiles() {
  if (!this.files.length) {
    fileList.innerHTML = "<p>No Files selected!</p>";
  } else {
    fileList.innerHTML = "";
    const ul = document.createElement("ul");
    fileList.appendChild(ul);
    for (let i = 0; i < this.files.length; i += 1) {
      const li = document.createElement("li");
      ul.appendChild(li);
      const img = document.createElement("img");
      img.src = URL.createObjectURL(this.files[i]);
      img.onload = () => {
        URL.revokeObjectURL(this.src);
      };
      li.appendChild(img);
    }
    if (this.files.length > 1) {
      const icon = document.createElement("i");
      icon.className = "xi-documents";
      ul.appendChild(icon);
    }
  }
}

function init() {
  uploadInput.addEventListener("change", handleFiles);
}
if (uploadForm) {
  init();
}
