function openDialog(siteName, typeOfHeritage, location, historicalSignificance, architecturalStyle, condition, ownership, conservationEfforts, threats, communityInvolvement) {
    document.getElementById('dialog-siteName').textContent = siteName;
    document.getElementById('dialog-typeOfHeritage').textContent = typeOfHeritage;
    document.getElementById('dialog-location').textContent = location;
    document.getElementById('dialog-historicalSignificance').textContent = historicalSignificance;
    document.getElementById('dialog-architecturalStyle').textContent = architecturalStyle;
    document.getElementById('dialog-condition').textContent = condition;
    document.getElementById('dialog-ownership').textContent = ownership;
    document.getElementById('dialog-conservationEfforts').textContent = conservationEfforts;
    document.getElementById('dialog-threats').textContent = threats;
    document.getElementById('dialog-communityInvolvement').textContent = communityInvolvement;
    
    // Uncomment and set image if available
    // document.getElementById('dialog-image').src = 'path/to/image.jpg'; 

    document.getElementById('dialog').style.display = 'block';
}

function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}

function searchHeritage() {
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


