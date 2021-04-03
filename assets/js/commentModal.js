const goBackBtn = document.querySelector("#jsGoBackPage");

if (goBackBtn) {
  goBackBtn.addEventListener("click", () => {
    window.history.back();
  });
}
