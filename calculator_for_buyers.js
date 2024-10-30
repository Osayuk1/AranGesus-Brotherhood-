// calculator_for_buyers.js

let cart = {};

// Function to calculate the price based on sell rates
function calculatePrice() {
    const itemSelect = document.getElementById('item');
    const quantityInput = document.getElementById('quantity');
    const selectedItem = itemSelect.value;
    const quantity = parseInt(quantityInput.value);

    const sellRates = {
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

    if (sellRates[selectedItem] && quantity) {
        const price = (1 / sellRates[selectedItem]) * quantity;
        document.getElementById('price').innerText = `${price.toFixed(2)} gold`;
        return { item: selectedItem, quantity, price: price.toFixed(2) };
    } else {
        document.getElementById('price').innerText = "Invalid selection or quantity.";
        return null;
    }
}

// Function to add the item to the cart
function addToCart() {
    const itemData = calculatePrice();
    if (itemData) {
        if (cart[itemData.item]) {
            cart[itemData.item].quantity += itemData.quantity;
            cart[itemData.item].price = (parseFloat(cart[itemData.item].price) + parseFloat(itemData.price)).toFixed(2);
        } else {
            cart[itemData.item] = { quantity: itemData.quantity, price: itemData.price };
        }
        updateCart();
    }
}

// Function to update the cart display
function updateCart() {
    const cartDisplay = document.getElementById('cart');
    cartDisplay.innerHTML = "";
    let totalGold = 0;

    for (const item in cart) {
        const itemRow = document.createElement('div');
        itemRow.innerText = `${item}: ${cart[item].quantity} units - ${cart[item].price} gold`;
        cartDisplay.appendChild(itemRow);
        totalGold += parseFloat(cart[item].price);
    }

    const totalRow = document.createElement('div');
    totalRow.innerText = `Total: ${totalGold.toFixed(2)} gold`;
    cartDisplay.appendChild(totalRow);
}

// Function to send data to the webhook and reset the cart
function buy() {
    const webhookUrl = "https://discord.com/api/webhooks/1268893038793719859/_ktjZVX-uHx8UVoYu7GAdrpkRLpbysF11nl120aBoWKRwdsY06g_9dAq1HYG7yeWvqwk";
    const totalGold = Object.values(cart).reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    const items = Object.keys(cart).map(item => `${item}: ${cart[item].quantity} units - ${cart[item].price} gold`).join("\n");

    const payload = {
        content: `Purchase Summary:\n\n${items}\n\nTotal Gold: ${totalGold}`
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            alert("Purchase successful! Cart will be reset.");
            cart = {};  // Reset cart
            updateCart();  // Update cart display
            document.getElementById('price').innerText = "";  // Clear price display
            document.getElementById('quantity').value = "";  // Clear quantity input
        } else {
            alert("Failed to send data to webhook.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while sending data to the webhook.");
    });
}

// Event listeners for buttons
document.getElementById('calculate').addEventListener('click', calculatePrice);
document.getElementById('addToCart').addEventListener('click', addToCart);
document.getElementById('buy').addEventListener('click', buy); 
