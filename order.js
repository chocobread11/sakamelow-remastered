document.addEventListener('DOMContentLoaded', function () {
    // Get the necessary elements
    const iconCart = document.querySelector('.iconCart');
    const cart = document.querySelector('.cart');
    const close = document.querySelector('.close');
    const totalQuantityElement = iconCart.querySelector('.totalQuantity');
    const listProductHTML = document.querySelector('.listProduct');
    const listCartHTML = document.querySelector('.listCart');
    const totalHTML = document.querySelector('.totalQuantity');

    // Initial setup for the cart
    let totalQuantity = 0;
    let listCart = [];

    // Function to update the cart count
    function updateCartCount(quantity) {
        totalQuantity += quantity;
        totalQuantityElement.textContent = totalQuantity;
        totalHTML.innerText = totalQuantity;
    }

    // Function to toggle the cart visibility
    function toggleCart() {
        cart.style.right = cart.style.right === '-100%' ? '0' : '-100%';
    }

    // Function to hide the cart
    function hideCart() {
        cart.style.right = '-100%';
    }

    // Function to add product data to HTML
    function addDataToHTML() {
        listProductHTML.innerHTML = '';

        if (products !== null) {
            products.forEach(product => {
                let newProduct = createProductElement(product);
                listProductHTML.appendChild(newProduct);
            });
        }
    }

    // Function to create a product element
    function createProductElement(product) {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <div class="price">RM${product.price}</div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>`;
        return newProduct;
    }

    // Function to add product to cart
    window.addToCart = function (productId) {
        let product = products.find(p => p.id === productId);
        if (product) {
            let existingProduct = listCart.find(p => p.id === productId);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                listCart.push({ id: productId, name: product.name, price: product.price, quantity: 1, image: product.image });
            }

            updateCartCount(1);
            addCartToHTML();
        }
    }

    // Function to add cart data to HTML
    function addCartToHTML() {
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;

        listCart.forEach(product => {
            let newCart = createCartElement(product);
            listCartHTML.appendChild(newCart);
            totalQuantity += product.quantity;
        });

        totalHTML.innerText = totalQuantity;
    }

    // Function to create a cart element
    function createCartElement(product) {
        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.innerHTML = `
            <img src="${product.image}">
            <div class="content">
                <div class="name">${product.name}</div>
                <div class="price">$${product.price} / 1 product</div>
            </div>
            <div class="quantity">
                <button onclick="changeQuantity(${product.id}, '-')">-</button>
                <span class="value">${product.quantity}</span>
                <button onclick="changeQuantity(${product.id}, '+')">+</button>
            </div>`;
        return newCart;
    }

    // Function to change product quantity in cart
    window.changeQuantity = function (productId, operation) {
        let product = listCart.find(p => p.id === productId);
        if (product) {
            if (operation === '-' && product.quantity > 1) {
                // Decrease quantity
                product.quantity--;
                updateCartCount(-1);
            } else if (operation === '-' && product.quantity === 1) {
                // Remove item from the cart if quantity is 1
                const itemIndex = listCart.findIndex(p => p.id === productId);
                if (itemIndex !== -1) {
                    listCart.splice(itemIndex, 1);
                    updateCartCount(-1);
                }
            } else if (operation === '+') {
                // Increase quantity
                product.quantity++;
                updateCartCount(1);
            }
            
            addCartToHTML();
        }
    }

    // Event listeners for cart interactions
    iconCart.addEventListener('click', toggleCart);
    close.addEventListener('click', hideCart);

    // Fetch data from JSON and populate the product list
    let products = null;
    fetch('product.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();
        });
});
