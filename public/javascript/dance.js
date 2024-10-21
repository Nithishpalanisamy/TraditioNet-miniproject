function openDialog(name, type, origin, description) {
    document.getElementById('dialog-name').textContent = name;
    document.getElementById('dialog-type').textContent = type;
    document.getElementById('dialog-origin').textContent = origin;
    document.getElementById('dialog-description').textContent = description;
    
    // If you have images, set them here
    // document.getElementById('dialog-image').src = 'path/to/image.jpg'; // Update with actual image path
    
    document.getElementById('dialog').style.display = 'block';
}

function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}

function searchDance() {
    const query = document.getElementById('search-input').value.trim().toLowerCase(); // Get the search input
    const cards = document.querySelectorAll('.card'); // Get all dance cards
    const noResultsMessage = document.getElementById('no-results-message'); // Get the no results message element

    // If the query is empty, show all cards and hide the no results message
    if (query.length === 0) {
        cards.forEach(card => {
            card.style.display = 'block'; // Show all cards
        });
        noResultsMessage.style.display = 'none'; // Hide the no results message
        return; // Exit the function early
    }

    let hasResults = false; // Flag to check if there are any results

    // Filter cards based on the search query
    cards.forEach(card => {
        const cardName = card.getAttribute('data-name'); // Get the card's name
        if (cardName.startsWith(query)) {
            card.style.display = 'block'; // Show the card if it matches
            hasResults = true; // Set the flag to true if at least one card matches
        } else {
            card.style.display = 'none'; // Hide the card if it doesn't match
        }
    });

    // Show or hide the no results message based on the results
    if (!hasResults) {
        noResultsMessage.style.display = 'inline'; // Show the no results message
    } else {
        noResultsMessage.style.display = 'none'; // Hide the no results message
    }
}

function filterDanceCards() {
    const typeFilter = document.getElementById('typeFilter').value;
    const originFilter = document.getElementById('originFilter').value;
    const cards = document.querySelectorAll('.card'); // Get all dance cards

    let noResults = true; // Flag to check if there are any visible cards

    cards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        const cardOrigin = card.getAttribute('data-origin');

        // Check if the card matches the selected filters
        const typeMatch = (typeFilter === 'None' || cardType === typeFilter);
        const originMatch = (originFilter === 'None' || cardOrigin === originFilter);

        // Show or hide the card based on the filter matches
        if (typeMatch && originMatch) {
            card.style.display = 'block'; // Show card if it matches both filters
            noResults = false; // Found at least one matching card
        } else {
            card.style.display = 'none'; // Hide card if it doesn't match
        }
    });

    // Show no results message if no cards are visible
    const noResultsMessage = document.getElementById('no-results-message');
    noResultsMessage.style.display = noResults ? 'block' : 'none';
}
