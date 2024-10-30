const rates = {
    "Akomeric": 810,
    "Bloodroot": 900,
    "Hyssop": 450,
    "Safflower": 225,
    "Sage Leaf": 225,
    "WolfMint": 585,
    "Vissinel": 630,
    "Sunburst Flower": 22.5,
    "Ember Fern": 22.5,
    "Stone": 720,
    "Copper Ore": 675,
    "Iron Ore": 315,
    "Gold Ore": 720,
    "Mithril Ore": 315,
    "Evergreen log": 360,
    "Oak log": 360,
    "Pine log": 360,
    "Maple log": 360,
    "Birch log": 360,
    "Spruce log": 360,
    "Fir log": 360,
    "Ash log": 270,
    "Willow log": 243,
    "Eucalyptus log": 180,
    "Elder log": 270,
    "RedWood log": 72,
    "Cedar log": 54,
    "Cherry Blossom log": 36,
    "Mahogany log": 27,
    "Chesnut log": 22.5,
    "Magnolia log": 14,
    "Ginko log": 8,
    "Feather": 405,
    "Hide": 405,
    "Yarn": 720
};

const cart = [];

document.getElementById('calculatePriceBtn').addEventListener('click', () => {
    const item = document.getElementById('itemSelect').value;
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const rate = rates[item];

    if (rate && quantity > 0) {
        const price = quantity / rate;
        document.getElementById('result').textContent = `Price: ${price.toFixed(2)} Gold`;
        addToCart(item, quantity, price);
    } else {
        document.getElementById('result').textContent = 'Invalid selection or quantity.';
    }
});

function addToCart(item, quantity, price) {
    cart.push({ item, quantity, price });
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let totalGold = 0;

    cart.forEach(({ item, quantity, price }) => {
        totalGold += price;
        const li = document.createElement('li');
        li.textContent = `${item}: ${quantity} (Price: ${price.toFixed(2)} Gold)`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = `Total Gold: ${totalGold.toFixed(2)}`;
}

document.getElementById('buyBtn').addEventListener('click', async () => {
    const webhookURL = 'https://discord.com/api/webhooks/1268893038793719859/_ktjZVX-uHx8UVoYu7GAdrpkRLpbysF11nl120aBoWKRwdsY06g_9dAq1HYG7yeWvqwk';
    const cartData = cart.map(({ item, quantity, price }) => `${item}: ${quantity} (Price: ${price.toFixed(2)} Gold)`).join('\n');
    const totalGold = cart.reduce((sum, { price }) => sum + price, 0).toFixed(2);

    const data = {
        content: `Items:\n${cartData}\nTotal Gold: ${totalGold}`,
    };

    await fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // Clear cart after purchase
    cart.length = 0;
    displayCart(); // Refresh cart display
});
