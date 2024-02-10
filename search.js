document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.searchInput input');
    
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const searchTerm = input.value;
            console.log('Search term:', searchTerm);
            // Make AJAX request to the server
            fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
                .then(response => response.json())
                .then(data => displaySearchResults(data))
                .catch(error => console.error('Error fetching search results:', error));
        }
    });
});

function displaySearchResults(data) {
    // Assuming data is an array of objects containing search results
    const buyWrapper = document.getElementById('buy-cardWrapper');
    buyWrapper.innerHTML = ''; // Clear previous search results

    data.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const productName = document.createElement('h2');
        productName.textContent = result.Product_Name;

        const price = document.createElement('p');
        price.textContent = `Price: $${result.Price}`;

        const quantity = document.createElement('p');
        quantity.textContent = `Quantity: ${result.Quantity}`;

        // Append elements to cardContent
        cardContent.appendChild(productName);
        cardContent.appendChild(price);
        cardContent.appendChild(quantity);

        // Append cardContent to card
        card.appendChild(cardContent);

        // Append card to buyWrapper
        buyWrapper.appendChild(card);
    });
}