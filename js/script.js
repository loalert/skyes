// Cart Handling
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.parentElement.querySelector('h3').innerText;
            const productPrice = event.target.parentElement.querySelector('p').innerText;
            cartItems.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    function updateCart() {
        const cartLink = document.querySelector('nav ul li a[href="cart.html"]');
        cartLink.textContent = `Panier (${cartItems.length})`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');

    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('€', ''));
            
            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }
            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>${item.name} - €${item.price} x ${item.quantity}</p>
                <button class="remove-item" data-name="${item.name}">Supprimer</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        handleRemoveButtons();
    }

    function handleRemoveButtons() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const name = e.target.getAttribute('data-name');
                cart = cart.filter(item => item.name !== name);
                updateCartDisplay();
            });
        });
    }
});
