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

async function searchHeritage() {
    const query = document.getElementById('search-bar').value.trim(); // Get search input

    if (query.length > 0) {
        // Fetch filtered heritage sites from the server
        const response = await fetch(`/searchHeritage?q=${query}`);
        const filteredHeritage = await response.json();

        const heritageContainer = document.getElementById('heritage-container');
        heritageContainer.innerHTML = ''; // Clear the previous list

        if (filteredHeritage.length > 0) {
            // Append new filtered results using the card layout
            filteredHeritage.forEach(site => {
                const heritageCard = `
                    <div class="card" onclick="openDialog('${site.siteName}', '${site.location}', '${site.typeOfHeritage}', '${site.historicalSignificance}', '${site.architecturalStyle}', '${site.condition}', '${site.ownership}', '${site.conservationEfforts}', '${site.threats}', '${site.communityInvolvement}')">
                        <h2 class="name text">${site.siteName}</h2>
                    </div>`;
                heritageContainer.innerHTML += heritageCard;
            });
        } else {
            // No heritage sites found message
            heritageContainer.innerHTML = '<p>No heritage sites found.</p>';
        }
    } else {
        // Fetch and reload the original list if search input is empty
        const response = await fetch('/heritage');
        const heritageList = await response.json();
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(await response.text(), 'text/html');
        document.getElementById('heritage-container').innerHTML = htmlDoc.querySelector('#heritage-container').innerHTML;

        // Append original heritage sites
        heritageList.forEach(site => {
            const heritageCard = `
                <div class="card" onclick="openDialog('${site.siteName}', '${site.location}', '${site.typeOfHeritage}', '${site.historicalSignificance}', '${site.architecturalStyle}', '${site.condition}', '${site.ownership}', '${site.conservationEfforts}', '${site.threats}', '${site.communityInvolvement}')">
                    <h2 class="name text">${site.siteName}</h2>
                </div>`;
            heritageContainer.innerHTML += heritageCard;
        });
    }
}


