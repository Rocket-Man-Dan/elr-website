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
    nav.classList.add("scroll");
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
    nav.classList.add("scroll");
    cartBtn.classList.add("scroll");
  } else if (oldScrollPos > curScrollPos + 2) {
    nav.classList.remove("scroll");
    cartBtn.classList.remove("scroll");
  }

  if (checkbox.checked) {
    nav.classList.remove("scroll");
    cartBtn.classList.remove("scroll");
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
  anchorHome.scrollIntoView({ behavior: "smooth" });
}

// ---------- STORE ---------- //
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  // console.log(selectedItem.id)
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;

  if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  // console.log(selectedItem.id)
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  // console.log(search.item)
  calculation();
};

let calculation = () => {
  let cartAmount = document.getElementById("cartAmount");
  cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  // console.log(basket.map((x) => x.item))
};

// if on store page generate items
let store = document.getElementById("store-wrapper");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let isInStore = document.getElementById("store");

let toggleType = [];
let toggleLogo = [];
let toggleLogoCol = [];
let toggleMaterial = [];

let clearFilters = false;

const filterToggleBtns = document.querySelectorAll(".store-toggle-btn");
let storeItems = document.querySelectorAll(".item");

setTimeout(function () {
  storeItems = document.querySelectorAll(".item");
  storeItems.forEach((item, i) => {
    btnApplyFilter.addEventListener("click", (e) => {
      item.remove();
      generateStore();

      // run setgenerateshop stuff here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });
  });
}, 500);

// filter buttons
const btnFilterMenu = document.getElementById("filter-btn-menu");
const btnApplyFilter = document.getElementById("btnApplyFilter");
const btnClearFilter = document.getElementById("btnClearFilter");

// MERCH TYPE
const btnToggleHats = document.getElementById("typeHat");
const btnToggleHoodies = document.getElementById("typeHoodie");
const btnToggleShirts = document.getElementById("typeShirt");
const btnToggleTrees = document.getElementById("typeTree");
const btnToggleStickers = document.getElementById("typeSticker");

// MERCH LOGO
const btnToggleLogoELR = document.getElementById("logoELR");
const btnToggleLogoGTR = document.getElementById("logoGTR");
const btnToggleLogoMonogram = document.getElementById("logoMonogram");

// MERCH LOGO COLOR
const btnToggleLogoColBlack = document.getElementById("logoColorBlack");
const btnToggleLogoColWhite = document.getElementById("logoColorWhite");
const btnToggleLogoColPurple = document.getElementById("logoColorPurple");
const btnToggleLogoColOrange = document.getElementById("logoColorOrange");
const btnToggleLogoColRed = document.getElementById("logoColorRed");

// MERCH MATERIAL
const btnToggleMatColBlack = document.getElementById("matColorBlack");
const btnToggleMatColWhite = document.getElementById("matColorWhite");
const btnToggleMatColPurple = document.getElementById("matColorPurple");
const btnToggleMatColOrange = document.getElementById("matColorOrange");

filterToggleBtns.forEach((toggleBtn, i) => {
  toggleBtn.addEventListener("click", (e) => {
    if (!toggleBtn.classList.contains("toggle")) {
      toggleBtn.classList.add("toggle");
      toggleBtn.children[0].classList.add("toggle");

      if (toggleBtn.getAttribute("data-tag-type")) {
        if (!toggleType.includes(toggleBtn.getAttribute("data-tag-type"))) {
          toggleType.push(toggleBtn.getAttribute("data-tag-type"));
        }
      } else if (toggleBtn.getAttribute("data-tag-logo")) {
        if (!toggleLogo.includes(toggleBtn.getAttribute("data-tag-logo"))) {
          toggleLogo.push(toggleBtn.getAttribute("data-tag-logo"));
        }
      } else if (toggleBtn.getAttribute("data-tag-logo-col")) {
        if (
          !toggleLogoCol.includes(toggleBtn.getAttribute("data-tag-logo-col"))
        ) {
          toggleLogoCol.push(toggleBtn.getAttribute("data-tag-logo-col"));
        }
      } else if (toggleBtn.getAttribute("data-tag-mat-col")) {
        if (
          !toggleMaterial.includes(toggleBtn.getAttribute("data-tag-mat-col"))
        ) {
          toggleMaterial.push(toggleBtn.getAttribute("data-tag-mat-col"));
        }
      }
    } else {
      toggleBtn.classList.remove("toggle");
      toggleBtn.children[0].classList.remove("toggle");

      if (toggleBtn.getAttribute("data-tag-type")) {
        if (toggleType.includes(toggleBtn.getAttribute("data-tag-type"))) {
          let curArray = toggleType;
          let dataVal = toggleType.indexOf(
            toggleBtn.getAttribute("data-tag-type")
          );
          removeFromArray(dataVal, curArray);
        }
      } else if (toggleBtn.getAttribute("data-tag-logo")) {
        if (toggleLogo.includes(toggleBtn.getAttribute("data-tag-logo"))) {
          let curArray = toggleLogo;
          let dataVal = toggleLogo.indexOf(
            toggleBtn.getAttribute("data-tag-logo")
          );
          removeFromArray(dataVal, curArray);
        }
      } else if (toggleBtn.getAttribute("data-tag-logo-col")) {
        if (
          toggleLogoCol.includes(toggleBtn.getAttribute("data-tag-logo-col"))
        ) {
          let curArray = toggleLogoCol;
          let dataVal = toggleLogoCol.indexOf(
            toggleBtn.getAttribute("data-tag-logo-col")
          );
          removeFromArray(dataVal, curArray);
        }
      } else if (toggleBtn.getAttribute("data-tag-mat-col")) {
        if (
          toggleMaterial.includes(toggleBtn.getAttribute("data-tag-mat-col"))
        ) {
          let curArray = toggleMaterial;
          let dataVal = toggleMaterial.indexOf(
            toggleBtn.getAttribute("data-tag-mat-col")
          );
          removeFromArray(dataVal, curArray);
        }
      }
    }
  });

  function removeFromArray(dataVal, curArray) {
    let index = dataVal;
    curArray.splice(index, 1);
  }

  btnClearFilter.addEventListener("click", (e) => {
    clearFilters = true;
    toggleBtn.classList.remove("toggle");
    toggleBtn.children[0].classList.remove("toggle");
    toggleType = [];
    toggleLogo = [];
    toggleLogoCol = [];
    toggleMaterial = [];
    generateStoreAll();
  });
});

btnFilterMenu.addEventListener("click", (e) => {
  clearFilters = false;
});

function toggleBtn(e) {
  e.classList.add("toggle");
}

let generateStoreAll = () => {
  if (isInStore !== null) {
    return (store.innerHTML = shopItemsData
      .map((x) => {
        let { id, name, price, desc, type, baseColor, tags, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
      <div id=product-id-${id} class="item">
        <div class="details">
          <div class="item-text">
            <img class="item-img" src="${img}" alt="">
            <h3>${name}</h3>
            <p>${desc}</p>
          </div>
          <div class="price-quantity">
            <h2>$${price}</h2>
            <div class="item-buttons">
              <img onclick="decrement(${id})" class="item-plus-minus" src="../src/img/icons/icon_minus.svg" alt="">
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <img onclick="increment(${id})" class="item-plus-minus" src="../src/img/icons/icon_plus.svg" alt="">
            </div>
          </div>
        </div>
      </div>
        `;
      })
      .join(""));
  }
};

if (
  toggleType.length == 0 &&
  toggleLogo.length == 0 &&
  toggleLogoCol.length == 0 &&
  toggleMaterial.length == 0
) {
  generateStoreAll();
}

let generateStore = () => {
  if (isInStore !== null) {
    let shopItemsDataGen = [];

    shopItemsData.forEach((item, index) => {
      let checkType = false;
      let checkLogo = false;
      let checkLogoCol = false;
      let checkMat = false;

      let typeMatch = false;
      let logoMatch = false;
      let logoColMatch = false;
      let matMatch = false;

      if (toggleType.length > 0) {
        checkType = true;
      } else {
        typeMatch = true;
      }
      if (toggleLogo.length > 0) {
        checkLogo = true;
      } else {
        logoMatch = true;
      }
      if (toggleLogoCol.length > 0) {
        checkLogoCol = true;
      } else {
        logoColMatch = true;
      }
      if (toggleMaterial.length > 0) {
        checkMat = true;
      } else {
        matMatch = true;
      }

      if (checkType && toggleType.includes(item.type)) {
        typeMatch = true;
      }
      if (checkLogo && toggleLogo.includes(item.tags[0])) {
        logoMatch = true;
      }
      if (checkLogoCol && toggleLogoCol.includes(item.tags[1])) {
        logoColMatch = true;
      }
      if (checkMat && toggleMaterial.includes(item.baseColor)) {
        matMatch = true;
      }

      if (typeMatch && logoMatch && logoColMatch && matMatch) {
        shopItemsDataGen.push(item);
      }
    });

    return (store.innerHTML = shopItemsDataGen
      .map((x) => {
        let { id, name, price, desc, type, baseColor, tags, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        if (
          toggleType.includes(type) ||
          toggleMaterial.includes(baseColor) ||
          toggleLogo.includes(tags[0]) ||
          toggleLogoCol.includes(tags[1])
        ) {
          return `
            <div id=product-id-${id} class="item">
              <div class="details">
                <div class="item-text">
                  <img class="item-img" src="${img}" alt="">
                  <h3>${name}</h3>
                  <p>${desc}</p>
                </div>
                <div class="price-quantity">
                  <h2>$${price}</h2>
                  <div class="item-buttons">
                    <img onclick="decrement(${id})" class="item-plus-minus" src="../src/img/icons/icon_minus.svg" alt="">
                    <div id=${id} class="quantity">
                    ${search.item === undefined ? 0 : search.item}
                    </div>
                    <img onclick="increment(${id})" class="item-plus-minus" src="../src/img/icons/icon_plus.svg" alt="">
                  </div>
                </div>
              </div>
            </div>
              `;
        }
      })
      .join(""));
  }
};

if (
  toggleType.length > 0 ||
  toggleLogo.length > 0 ||
  toggleLogoCol.length > 0 ||
  toggleMaterial > 0
) {
  generateStore();
}

btnApplyFilter.addEventListener("click", (e) => {
  generateStore();

  // run setgenerateshop stuff here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
});

// calculation();

// ---------- Shorts Player ---------- //
const mediaViewer = document.querySelector("div.video-viewer");

const ytEmbed = document.querySelector("iframe.yt-shorts-player");

const ytShortsExitBtn = document.querySelector("close-media-player");

function closeMediaViewer() {
  ytEmbed.src = "";
  mediaViewer.style.display = "none";
}
