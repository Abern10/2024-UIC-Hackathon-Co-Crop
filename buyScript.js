// This file will handle displaying search results on the buy.html page
// Assuming you already have a function called displaySearchResults in search.js

document.addEventListener('DOMContentLoaded', function () {
    // Parse the query parameter to get the search term
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search');
    
    // If a search term exists, make an AJAX request to fetch search results
    if (searchTerm) {
        // Make AJAX request to the server
        fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())
            .then(data => displaySearchResults(data))
            .catch(error => console.error('Error fetching search results:', error));
    }
});