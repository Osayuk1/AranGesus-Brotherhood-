const prices = {
    "Akomeric": 810,
    "Bloodroot": 600,
    "Hyssop": 200,
    "Safflower": 400,
    "Sage Leaf": 250,
    "WolfMint": 500,
    "Vissinel": 300,
    "Sunburst Flower": 700,
    "Ember Fern": 450,
    "Stone": 20,
    "Copper Ore": 50,
    "Iron Ore": 100,
    "Gold Ore": 500,
    "Mithril Ore": 1000,
    "Evergreen log": 150,
    "Oak log": 200,
    "Pine log": 180,
    "Maple log": 220,
    "Birch log": 160,
    "Spruce log": 140,
    "Fir log": 120,
    "Ash log": 180,
    "Willow log": 190,
    "Eucalyptus log": 210,
    "Elder log": 250,
    "RedWood log": 300,
    "Cedar log": 240,
    "Cherry Blossom log": 280,
    "Mahogany log": 320,
    "Chesnut log": 260,
    "Magnolia log": 270,
    "Ginko log": 290,
    "Feather": 80,
    "Hide": 90,
    "Yarn": 70
};

let cart = [];

document.getElementById("calculatePriceBtn").addEventListener("click", function() {
    const item = document.getElementById("itemSelect").value;
    const quantity = parseInt(document.getElementById("quantityInput").value);
    const price = (prices[item] / 810) * quantity; // Calculate price based on Akomeric conversion
    document.getElementById("result").innerText = `Total Price: ${price.toFixed(2)} 🪙`;
});

document.getElementById("addToCartBtn").addEventListener("click", function() {
    const item = document.getElementById("itemSelect").value;
    const quantity = parseInt(document.getElementById("quantityInput").value);
    const discordName = document.getElementById("discordName").value;
    const tradeName = document.getElementById("tradeName").value;

    if (quantity > 0) {
        const price = (prices[item] / 810) * quantity;
        cart.push({ item, quantity, price });
        updateCart(discordName, tradeName);
    }
});

document.getElementById("buyBtn").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items to the cart before purchasing.");
        return;
    }

    const discordName = document.getElementById("discordName").value;
    const tradeName = document.getElementById("tradeName").value;

    const purchaseDetails = {
        discordName: discordName,
        tradeName: tradeName,
        items: cart,
        total: cart.reduce((total, item) => total + item.price, 0)
    };

    fetch('https://discord.com/api/webhooks/1268893038793719859/_ktjZVX-uHx8UVoYu7GAdrpkRLpbysF11nl120aBoWKRwdsY06g_9dAq1HYG7yeWvqwk', {
        method: 'POST',
        body: JSON.stringify(purchaseDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error processing purchase: ' + response.statusText);
        }
        alert("Purchase successful!");
        cart = []; // Clear cart after purchase
        updateCart(); // Update cart display
    })
    .catch(error => {
        alert("Error processing purchase: " + error.message);
    });
});

function updateCart(discordName = "", tradeName = "") {
    const cartItemsList = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    cartItemsList.innerHTML = ""; // Clear existing items

    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerText = `${item.quantity} x ${item.item}: ${item.price.toFixed(2)} 🪙`;
        cartItemsList.appendChild(listItem);
    });

    const totalAmount = cart.reduce((total, item) => total + item.price, 0);
    cartTotal.innerText = `Total: ${totalAmount.toFixed(2)} 🪙`;

    // Show Discord and Trade name in cart
    if (discordName && tradeName) {
        const nameInfo = document.createElement("li");
        nameInfo.innerText = `Discord: ${discordName}, Trade: ${tradeName}`;
        cartItemsList.appendChild(nameInfo);
    }
        } 
