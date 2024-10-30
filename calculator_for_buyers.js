// Define item prices based on sell rates
const itemPrices = {
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

// Cart to hold items
let cart = [];

// Calculate price button event
document.getElementById("calculatePriceBtn").addEventListener("click", function() {
    const selectedItem = document.getElementById("itemSelect").value;
    const quantity = document.getElementById("quantityInput").value;
    const price = itemPrices[selectedItem] * quantity;
    document.getElementById("result").innerText = `Price for ${quantity} ${selectedItem}: ${price.toFixed(2)} 🪙`;
});

// Add to cart button event
document.getElementById("addToCartBtn").addEventListener("click", function() {
    const selectedItem = document.getElementById("itemSelect").value;
    const quantity = document.getElementById("quantityInput").value;
    const discordName = document.getElementById("discordName").value;
    const tradeName = document.getElementById("tradeName").value;

    // Check if item is already in cart
    const existingItem = cart.find(item => item.name === selectedItem);
    if (existingItem) {
        existingItem.quantity += parseInt(quantity);
    } else {
        cart.push({ name: selectedItem, quantity: parseInt(quantity) });
    }

    // Update cart display
    updateCart();

    // Clear input fields
    document.getElementById("quantityInput").value = 1;
    document.getElementById("discordName").value = "";
    document.getElementById("tradeName").value = "";
});

// Function to update the cart display
function updateCart() {
    const cartItemsElement = document.getElementById("cartItems");
    cartItemsElement.innerHTML = ""; // Clear previous items

    let total = 0;

    cart.forEach(item => {
        const price = (itemPrices[item.name] * item.quantity).toFixed(2);
        total += parseFloat(price);
        const listItem = document.createElement("li");
        listItem.innerText = `${item.quantity} ${item.name}: ${price} 🪙`;
        cartItemsElement.appendChild(listItem);
    });

    document.getElementById("cartTotal").innerText = `Total: ${total.toFixed(2)} 🪙`;
}

// Buy button event
document.getElementById("buyBtn").addEventListener("click", function() {
    const discordName = document.getElementById("discordName").value;
    const tradeName = document.getElementById("tradeName").value;
    
    // Prepare data to send to webhook
    const data = {
        discordName: discordName,
        tradeName: tradeName,
        items: cart,
        total: document.getElementById("cartTotal").innerText,
    };

    // Send data to webhook
    fetch("https://discord.com/api/webhooks/1268893038793719859/_ktjZVX-uHx8UVoYu7GAdrpkRLpbysF11nl120aBoWKRwdsY06g_9dAq1HYG7yeWvqwk", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            alert("Purchase successful!");
            cart = []; // Clear cart after purchase
            updateCart(); // Update cart display
        } else {
            alert("Error processing purchase.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error sending data.");
    });
});
