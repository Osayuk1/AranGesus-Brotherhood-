// calculator_for_buyers.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const selectedItem = form.item-select.value;
        const quantity = parseInt(form.quantity.value);
        const akomericPrice = parseFloat(form.item-select.options[form.item-select.selectedIndex].dataset.price);

        if (selectedItem && !isNaN(quantity) && quantity > 0) {
            // Calculate total price in gold
            const totalPriceGold = (quantity / akomericPrice).toFixed(2);

            // Display the result
            resultDiv.innerHTML = `Total Price for ${quantity} ${selectedItem} is: 🪙 ${totalPriceGold}`;
        } else {
            resultDiv.innerHTML = "Please select an item and enter a valid quantity.";
        }
    });
});
