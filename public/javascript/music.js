const musicListDiv = document.getElementById('music-list');
const searchInput = document.getElementById('search');

// Function to fetch and display music list
async function fetchMusic() {
    try {
        const response = await fetch('/api/music'); // Fetching music data from the API
        if (!response.ok) throw new Error('Network response was not ok');
        const musicList = await response.json();
        displayMusic(musicList);
    } catch (error) {
        console.error('Error fetching music:', error);
    }
}

// Function to display music
function displayMusic(musicList) {
    musicListDiv.innerHTML = ''; // Clear previous items
    musicList.forEach(music => {
        const musicItem = document.createElement('div');
        musicItem.className = 'music-item';
        musicItem.innerHTML = `
            <img src="${music.imageUrl}" alt="${music.name}">
            <div>
                <h3>${music.name}</h3>
                <p>Region: ${music.region}</p>
                <p>${music.description}</p>
            </div>
        `;
        musicListDiv.appendChild(musicItem);
    });
}

function openDialog(title, region,description, imageUrl) {
    document.getElementById('dialogTitle').innerText = title;
    document.getElementById('dialogRegion').innerText = region;
    document.getElementById('dialogDescription').innerText = description;
    document.getElementById('dialogImage').style.backgroundImage = `url('${imageUrl}')`;
    document.getElementById('dialogImage').style.height = '200px'; // Set height for the image
    document.getElementById('musicDialog').style.display = 'block';
}

function closeDialog() {
    document.getElementById('musicDialog').style.display = 'none';
}


async function searchMusic() {
    const query = document.getElementById('search-bar').value.trim(); // Get search input

    if (query.length > 0) {
        // Fetch filtered music from the server
        const response = await fetch(`/search?q=${query}`);
        const filteredMusic = await response.json();

        const musicContainer = document.getElementById('music-container');
        musicContainer.innerHTML = ''; // Clear the previous list

        if (filteredMusic.length > 0) {
            // Append new filtered results using the card layout
            filteredMusic.forEach(music => {
                const musicCard = `
                    <div class="music-card" onclick="openDialog('${music.name}', '${music.region}', '${music.description}', '${music.imageUrl}')">
                        <div class="card-image" style="background-image: url('${music.imageUrl}');"></div>
                        <div class="card-title">${music.name}</div>
                    </div>`;
                musicContainer.innerHTML += musicCard;
            });
        } else {
            // No music found message
            musicContainer.innerHTML = '<p>No music found.</p>';
        }
    } else {
        // Fetch and reload the original list if search input is empty
        const response = await fetch('/music');
        const musicList = await response.json();
         // Adjust this path if necessary
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(await response.text(), 'text/html');
        document.getElementById('music-container').innerHTML = htmlDoc.querySelector('#music-container').innerHTML;
         // Append original music items
         musicList.forEach(music => {
            const musicItem = `
                <div class="music-card" onclick="openDialog('${music.name}', '${music.region}', '${music.description}', '${music.imageUrl}')">
                    <div class="card-image" style="background-image: url('${music.imageUrl}');"></div>
                    <div class="card-title">${music.name}</div>
                </div>`;
            musicContainer.innerHTML += musicItem;
        });
    }
    }


// Initial fetch
fetchMusic();
