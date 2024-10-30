const itemRates = {
    "Akomeric": 1 / 810,
    "Bloodroot": 1 / 900,
    "Hyssop": 1 / 450,
    "Safflower": 1 / 225,
    "Sage Leaf": 1 / 225,
    "WolfMint": 1 / 585,
    "Vissinel": 1 / 630,
    "Sunburst Flower": 1 / 22.5,
    "Ember Fern": 1 / 22.5,
    "Stone": 1 / 720,
    "Copper Ore": 1 / 675,
    "Iron Ore": 1 / 315,
    "Gold Ore": 1 / 720,
    "Mithril Ore": 1 / 315,
    "Evergreen log": 1 / 360,
    "Oak log": 1 / 360,
    "Pine log": 1 / 360,
    "Maple log": 1 / 360,
    "Birch log": 1 / 360,
    "Spruce log": 1 / 360,
    "Fir log": 1 / 360,
    "Ash log": 1 / 270,
    "Willow log": 1 / 243,
    "Eucalyptus log": 1 / 180,
    "Elder log": 1 / 270,
    "RedWood log": 1 / 72,
    "Cedar log": 1 / 54,
    "Cherry Blossom log": 1 / 36,
    "Mahogany log": 1 / 27,
    "Chesnut log": 1 / 22.5,
    "Magnolia log": 1 / 14,
    "Ginko log": 1 / 8,
    "Feather": 1 / 405,
    "Hide": 1 / 405,
    "Yarn": 1 / 720,
};

let cart = [];

document.getElementById('calculatePriceBtn').addEventListener('click', function() {
    const item = document.getElementById('itemSelect').value;
    const quantity = parseInt(document.getElementById('quantityInput').value);
    
    // Check if quantity is valid
    if (quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }
    
    const pricePerItem = itemRates[item];
    const totalPrice = (pricePerItem * quantity).toFixed(2);
    
    // Show result
    document.getElementById('result').innerHTML = `
        Price for ${quantity} ${item}(s): ${totalPrice} 🪙
        <button onclick="addToCart('${item}', ${quantity}, ${totalPrice})">Add to Cart</button>
    `;
});

function addToCart(item, quantity, totalPrice) {
    const cartItem = cart.find(cartItem => cartItem.item === item);
    if (cartItem) {
        cartItem.quantity += quantity;
        cartItem.total += parseFloat(totalPrice);
    } else {
        cart.push({ item, quantity, total: parseFloat(totalPrice) });
    }
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let totalCartValue = 0;

    cart.forEach(cartItem => {
        const li = document.createElement('li');
        li.innerText = `${cartItem.item}: ${cartItem.quantity} - Total: ${cartItem.total.toFixed(2)} 🪙`;
        cartItemsContainer.appendChild(li);
        totalCartValue += cartItem.total;
    });

    document.getElementById('cartTotal').innerText = `Total Cart Value: ${totalCartValue.toFixed(2)} 🪙`;
}

document.getElementById('buyBtn').addEventListener('click', function() {
    const totalCartValue = cart.reduce((sum, cartItem) => sum + cartItem.total, 0);
    
    // Prepare data to send to webhook
    const data = {
        items: cart,
        totalGold: totalCartValue,
    };

    // Send to webhook
    fetch('https://discord.com/api/webhooks/1268893038793719859/_ktjZVX-uHx8UVoYu7GAdrpkRLpbysF11nl120aBoWKRwdsY06g_9dAq1HYG7yeWvqwk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            alert('Purchase successful!');
            cart = []; // Clear cart after successful purchase
            updateCart(); // Update cart display
        } else {
            alert('Purchase failed!');
        }
    })
    .catch(error => console.error('Error:', error));
}); 
