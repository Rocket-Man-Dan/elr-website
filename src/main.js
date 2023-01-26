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

  if (window.pageYOffset > curScrollPos) {
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
  console.log("window y " + this.scrollY);

  if (oldScrollPos < curScrollPos) {
    nav.classList.add("scroll");
    cartBtn.classList.add("scroll");
  } else if (oldScrollPos > curScrollPos) {
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
      console.log("clicked");
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

if (isInStore !== null) {
  let generateStore = () => {
    return (store.innerHTML = shopItemsData
      .map((x) => {
        let { id, name, price, desc, img } = x;
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
  };

  generateStore();

  calculation();
}
