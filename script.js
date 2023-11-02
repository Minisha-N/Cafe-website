let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}
let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-item-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}
window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}


// Find the menu items with the "add-to-cart" button class
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Select cart items container and cart total elements
const cartItemsContainer = document.querySelector('.cart-item-container');
const cartTotal = document.querySelector('.cart-item-container .cart-total');


// Initialize an empty cart array
const cart = [];

// Function to update the cart display and total
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; 

    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div class="cart-item-content">
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h3>${item.name} x ${item.quantity}</h3>
                    <p class="price">₹${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
            <i class="fa fa-minus remove-one-from-cart" data-name="${item.name}"></i>
            <i class="fa fa-plus add-one-to-cart" data-name="${item.name}"></i>
            <i class="fa fa-times remove-all-from-cart" data-name="${item.name}"></i>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    const cartTotalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: ₹${cartTotalAmount.toFixed(2)}`;
}

// Function to add an item to the cart
function addToCart(itemName, itemPrice, itemImage) {
    const existingItem = cart.find((item) => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1, image: itemImage });
    }

    updateCartDisplay();
}

// Function to remove one quantity of an item from the cart
function removeOneFromCart(itemName) {
    const existingItem = cart.find((item) => item.name === itemName);

    if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
    } else {
        removeItemFromCart(itemName);
    }

    updateCartDisplay();
}

// Function to remove an item from the cart
function removeItemFromCart(itemName) {
    const itemIndex = cart.findIndex((item) => item.name === itemName);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    }

    updateCartDisplay();
}

// Adding items to the cart
addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const menuItem = button.closest('.box');
        const itemName = menuItem.querySelector('h3').textContent;
        const itemPrice = parseFloat(menuItem.querySelector('.price').textContent);
        const itemImage = menuItem.querySelector('img').src;

        // Add the item to the cart
        addToCart(itemName, itemPrice, itemImage);
    });
});

// Removing one quantity of items from the cart
cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-one-from-cart')) {
        const itemName = event.target.getAttribute('data-name');
        removeOneFromCart(itemName);
    }
});

// Removing all quantities of items from the cart
cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-all-from-cart')) {
        const itemName = event.target.getAttribute('data-name');
        removeItemFromCart(itemName);
    }
});

// Function to increase the quantity of an item in the cart
function addOneToCart(itemName) {
    const existingItem = cart.find((item) => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
    }

    updateCartDisplay();
}

// Adding one quantity of items to the cart
cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-one-to-cart')) {
        const itemName = event.target.getAttribute('data-name');
        addOneToCart(itemName);
    }
});



