window.addEventListener("scroll", function () {
  let isScrolledNav = false;

  const popup = this.document.querySelector(".popup-container");

  if (window.pageYOffset > toTopPos) {
    popup.classList.add("scroll");
  } else if (window.pageYOffset < toTopPos) {
    popup.classList.remove("scroll");
  }
});
