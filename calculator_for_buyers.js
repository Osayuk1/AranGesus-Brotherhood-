document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("calculator-form");
    const resultDiv = document.getElementById("result");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
        
        // Get selected item and quantity
        const selectedItem = document.getElementById("item-select");
        const quantity = parseFloat(document.getElementById("quantity").value);
        
        if (selectedItem.value) {
            // Get the sell rate from the selected option
            const sellRate = parseFloat(selectedItem.options[selectedItem.selectedIndex].dataset.price);
            
            // Calculate price using the formula: (Quantity / Sell Rate)
            const price = quantity / sellRate;

            // Display the result
            resultDiv.innerHTML = `Total price for ${quantity} ${selectedItem.value}(s): ${price.toFixed(2)} 🪙`;
        } else {
            resultDiv.innerHTML = "Please select an item.";
        }
    });
}); 
