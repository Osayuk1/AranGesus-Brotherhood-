const prices = {
    Akomeric: 1 / 810,
    Bloodroot: 1 / 800,
    Hyssop: 1 / 750,
    Safflower: 1 / 700,
    'Sage Leaf': 1 / 600,
    WolfMint: 1 / 650,
    Vissinel: 1 / 500,
    'Sunburst Flower': 1 / 550,
    'Ember Fern': 1 / 300,
    Stone: 1 / 250,
    'Copper Ore': 1 / 300,
    'Iron Ore': 1 / 400,
    'Gold Ore': 1 / 500,
    'Mithril Ore': 1 / 600,
    'Evergreen log': 1 / 200,
    'Oak log': 1 / 300,
    'Pine log': 1 / 400,
    'Maple log': 1 / 450,
    'Birch log': 1 / 500,
    'Spruce log': 1 / 300,
    'Fir log': 1 / 250,
    'Ash log': 1 / 400,
    'Willow log': 1 / 450,
    'Eucalyptus log': 1 / 500,
    'Elder log': 1 / 550,
    'RedWood log': 1 / 600,
    'Cedar log': 1 / 500,
    'Cherry Blossom log': 1 / 700,
    'Mahogany log': 1 / 650,
    'Chesnut log': 1 / 700,
    'Magnolia log': 1 / 600,
    'Ginko log': 1 / 500,
    Feather: 1 / 400,
    Hide: 1 / 300,
    Yarn: 1 / 350
};

let cart = [];

document.getElementById('calculatePriceBtn').addEventListener('click', calculatePrice);
document.getElementById('addToCartBtn').addEventListener('click', addToCart);
document.getElementById('buyBtn').addEventListener('click', processPurchase);

function calculatePrice() {
    const itemSelect = document.getElementById('itemSelect');
    const quantityInput = document.getElementById('quantityInput');
    const result = document.getElementById('result');

    const selectedItem = itemSelect.value;
    const quantity = parseInt(quantityInput.value);
    
    const price = (prices[selectedItem] * quantity).toFixed(2);
    result.innerHTML = `Price for ${quantity} ${selectedItem}: ${price} 🪙`;
}

function addToCart() {
    const itemSelect = document.getElementById('itemSelect');
    const quantityInput = document.getElementById('quantityInput');
    const discordName = document.getElementById('discordName').value;
    const tradeName = document.getElementById('tradeName').value;

    const selectedItem = itemSelect.value;
    const quantity = parseInt(quantityInput.value);
    
    const price = (prices[selectedItem] * quantity).toFixed(2);
    const cartItem = { item: selectedItem, quantity: quantity, price: price, discordName: discordName, tradeName: tradeName };

    cart.push(cartItem);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.quantity} x ${item.item} at ${item.price} 🪙 (Discord: ${item.discordName}, Trade: ${item.tradeName})`;
        cartItems.appendChild(listItem);
        total += parseFloat(item.price);
    });

    cartTotal.textContent = `Total: ${total.toFixed(2)} 🪙`;
}

async function processPurchase() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const webhookUrl = 'https://discord.com/api/webhooks/1268893038793719859/_ktjZVX-uHx8UVoYu7GAdrpkRLpbysF11nl120aBoWKRwdsY06g_9dAq1HYG7yeWvqwk';

    const purchaseDetails = cart.map(item => `${item.quantity} x ${item.item} at ${item.price} 🪙 (Discord: ${item.discordName}, Trade: ${item.tradeName})`).join('\n');
    const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

    const payload = {
        content: `Purchase Details:\n${purchaseDetails}\nTotal: ${totalAmount} 🪙`
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json(); // Get the error message
            throw new Error(errorData.message || 'Network response was not ok');
        }

        alert("Purchase processed successfully!");
        cart = []; // Clear the cart after purchase
        updateCart(); // Update the cart display
    } catch (error) {
        alert(`Error processing purchase: ${error.message}`);
    }
        } 
