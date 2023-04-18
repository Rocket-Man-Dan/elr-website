// ---------- NAV BAR ---------- //
let curScrollPos = 0;
let oldScrollPos = 0;

let toTopPos = 200;

window.addEventListener("scroll", function () {
  let isScrolledNav = false;

  //HTML Elements
  const nav = document.querySelector(".nav-wrapper");
  const toTop = this.document.querySelector(".back-to-top");

  const cartBtn = this.document.querySelector(".cart-btn");
  let checkbox = document.getElementById("mobile-nav");

  if (window.pageYOffset > curScrollPos + 2) {
    // nav.classList.add("scroll");
    isScrolledNav = true;
  }

  if (window.pageYOffset > toTopPos) {
    toTop.classList.add("scroll");
  } else if (window.pageYOffset < toTopPos) {
    toTop.classList.remove("scroll");
  }

  oldScrollPos = curScrollPos;
  // console.log("oldScrollPos " + oldScrollPos)
  curScrollPos = this.scrollY;
  // console.log("curScrollPos " + curScrollPos)
  // console.log("window y " + this.scrollY);

  if (oldScrollPos + 2 < curScrollPos) {
    // nav.classList.add("scroll");
    // cartBtn.classList.add("scroll");
  } else if (oldScrollPos > curScrollPos + 2) {
    // nav.classList.remove("scroll");
    // cartBtn.classList.remove("scroll");
  }

  if (checkbox.checked) {
    // nav.classList.remove("scroll");
    // cartBtn.classList.remove("scroll");
  }
});

document.addEventListener("click", function ClickOutsideNav(event) {
  const nav = document.querySelector(".mobile-nav-hitbox");
  let checkbox = document.getElementById("mobile-nav");

  if (checkbox.checked) {
    if (nav.contains(event.target)) {
      checkbox.checked = false;
      // console.log("clicked");
    }
  }
});

function expandMenuItems() {
  const btnStore = document.getElementById("nav-store");
  const storeMenu = document.getElementById("store-menu");

  if (!btnStore.classList.contains("expand")) {
    btnStore.classList.add("expand");
    storeMenu.classList.add("expand");
    console.log("clicked");
  } else {
    btnStore.classList.remove("expand");
    storeMenu.classList.remove("expand");
  }
}

function scrollToVideos() {
  const anchorHome = document.getElementById("videos");
  const scrollOffset = -50;
  const anchorPos = anchorHome.getBoundingClientRect().top;
  console.log(anchorPos);
  const offsetPos = anchorPos + scrollOffset;

  window.scrollTo({
    top: offsetPos,
    behavior: "smooth",
  });
}

// calculation();

// copy text to clipboard

function copyToClipboard() {
  let notifyCopy = document.querySelector(".clipboard-notification");

  notifyCopy.classList.add("show");

  setTimeout(function () {
    notifyCopy.classList.remove("show");
  }, 1000);

  navigator.clipboard.writeText("support@exoticluxuryreviews.com");
}

// ---------- Shorts Player ---------- //
var mediaViewer = document.getElementById("mediaViewer");

console.log(mediaViewer);

var ytEmbed = document.getElementById("ytEmbed");

var ytShortsExitBtn = document.querySelector("close-media-player");

function closeMediaViewer() {
  ytEmbed.src = "";
  mediaViewer.style.display = "none";
}
