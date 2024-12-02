// Add a product to the cart
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if the product already exists in the cart
    let existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;  // If product exists, increase quantity
    } else {
        cart.push(product);  // Add new product to cart
    }

    localStorage.setItem('cart', JSON.stringify(cart));  // Store cart in localStorage
    alert(`${productName} ajouté au panier !`);
}

// Change the main product image when clicking a thumbnail
function changeImage(imageSrc) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = imageSrc;
}

// Show cart items on the cart page
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';  // Clear current cart items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Votre panier est vide.</p>';
    } else {
        cart.forEach(item => {
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>${item.name} - €${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Retirer</button>
            `;
            cartContainer.appendChild(itemDiv);
        });
    }
}

// Remove a product from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));  // Update cart in localStorage
    displayCartItems();  // Refresh cart display
}

// Checkout functionality (for demo)
function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Votre panier est vide. Ajoutez des produits avant de passer à la caisse.');
    } else {
        alert('Commande passée ! Merci pour votre achat.');
        localStorage.removeItem('cart');  // Clear cart after checkout
        displayCartItems();  // Update cart display
    }
}
