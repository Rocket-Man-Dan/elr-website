let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')
let cart = document.getElementById('cart')
basket = JSON.parse(localStorage.getItem('data')) || []

let cartCalculation = () => {
	let cartAmount = document.getElementById('cartAmount');
	cartAmount.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
	// console.log(basket.map((x) => x.item))
	
}

cartCalculation()

let totalAmount = () => {
	if(basket.length !== 0){
		let amount = basket.map((x) => {
			let {item, id} = x;
			let search = shopItemsData.find((x) => x.id === id) || [];
			return item * search.price;
		}).reduce((x,y) => x+y, 0)
		// console.log(amount)
		label.innerHTML = `
		<h2> Total: $ ${amount} </h2>
		<button style="color: black;" class="checkout"><span>Checkout</span></button>
		<button onclick="clearCart();" style="color: black;" class="remove-all"><span>Clear Cart</span></button>
		`
	}
	else return

}

totalAmount();



let generateCartItems = () => {
	if(basket.length !==0){
		cart.classList.remove("empty")
		totalAmount();
		return (shoppingCart.innerHTML = basket
			.map((x) => {
				let {id, item } = x;
				let search = shopItemsData.find((y) => y.id === id) || []
				return `
				<div class="cart-item cart">
					<img class="cart-item-img cart" src="${search.img}" alt"" />
					<div class="details cart">
						<img onclick="removeItem(${id}); generateCartItems(); totalAmount(); cartCalculation()" class="item-delete" src="../src/img/icons/icon_x.svg" alt="">
						<div class="title-price-x" id="">
							<h2>${search.name}</h2>
							<h3>$ ${search.price}</h3>
							<p>${search.desc}</p>
						</div>
						<div class="item-buttons cart">
							<img onclick="decrement(${id}); generateCartItems(); totalAmount();" class="item-plus-minus cart" src="../src/img/icons/icon_minus.svg" alt="">
							<div id=${id} class="quantity cart">
								${item}
							</div>
							<img onclick="increment(${id}); generateCartItems(); totalAmount();" class="item-plus-minus cart" src="../src/img/icons/icon_plus.svg" alt="">
						</div>	
						<p class="item-total-cost">Total: $${item * search.price}</p>
					</div>
				</div>
				`;
		}).join(''));
	}
	else{
		cart.classList.add("empty")
		shoppingCart.innerHTML = ``
		label.innerHTML = `
		<h2>Cart is Empty</h2>
		<a class="back-store-btn" href="../store/index.html">
			<span>Back To Store</span>
		</a>
		`
	}
}

generateCartItems();

let clearCart = () => {
	basket = []
	generateCartItems();
	totalAmount();
	cartCalculation()
	localStorage.setItem("data", JSON.stringify(basket))
}

let removeItem = (id) => {
	let selectedItem = id
	basket = basket.filter((x) => x.id !== selectedItem.id)
	localStorage.setItem("data", JSON.stringify(basket))
	generateCartItems();
}

