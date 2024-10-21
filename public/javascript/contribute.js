// Function to open the modal
function openModal(dialogId) {
    document.getElementById(dialogId).style.display = 'block';
}

// Close the modal when the user clicks on <span> (x)
const closeButtons = document.getElementsByClassName("close");
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
        this.parentElement.parentElement.style.display = 'none';
    }
}

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Function to handle music contribution submission
document.getElementById("music-submit-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("music-name").value;
    const region = document.getElementById("music-region").value;
    const description = document.getElementById("music-description").value;
    const imageInput = document.getElementById("music-image");
    const formData = new FormData();

    formData.append("name", name);
    formData.append("region", region);
    formData.append("description", description);
    formData.append("image", imageInput.files[0]);

    try {
        const response = await fetch('/contribute-music', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Music contribution submitted successfully!');
            document.getElementById("music-dialog").style.display = 'none'; // Close modal
        } else {
            const errorText = await response.text();
            alert('Error submitting music contribution: ' + errorText);
            console.log('Error details:', errorText); // Log error details for debugging
        }
    } catch (error) {
        alert('Network error: ' + error);
    }
});

// Function to handle dance contribution submission
document.getElementById("dance-submit-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("dance-name").value;
    const type = document.querySelector('input[name="dance-type"]:checked').value;
    const origin = document.getElementById("dance-origin").value;
    const description = document.getElementById("dance-description").value;
    const imageInput = document.getElementById("dance-image");
    const formData = new FormData();

    formData.append("name", name);
    formData.append("type", type);
    formData.append("origin", origin);
    formData.append("description", description);
    formData.append("image", imageInput.files[0]);

    try {
        const response = await fetch('/contribute-dance', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Dance contribution submitted successfully!');
            document.getElementById("dance-dialog").style.display = 'none'; // Close modal
        } else {
            const errorText = await response.text();
            alert('Error submitting dance contribution: ' + errorText);
            console.log('Error details:', errorText); // Log error details for debugging
        }
    } catch (error) {
        alert('Network error: ' + error);
    }
});

// Function to handle heritage contribution submission
// Function to handle heritage contribution submission
document.getElementById("heritage-submit-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    const location = document.getElementById("dialog-location").value;
    const typeOfHeritage = document.getElementById("dialog-typeOfHeritage").value;
    const historicalSignificance = document.getElementById("dialog-historicalSignificance").value;
    const architecturalStyle = document.getElementById("dialog-architecturalStyle").value;
    const condition = document.getElementById("dialog-condition").value;
    const ownership = document.getElementById("dialog-ownership").value;
    const conservationEfforts = document.getElementById("dialog-conservationEfforts").value;
    const threats = document.getElementById("dialog-threats").value;
    const communityInvolvement = document.getElementById("dialog-communityInvolvement").value;

    const heritageData = {
        location,
        typeOfHeritage,
        historicalSignificance,
        architecturalStyle,
        condition,
        ownership,
        conservationEfforts,
        threats,
        communityInvolvement
    };

    try {
        const response = await fetch('/contribute-heritage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(heritageData)
        });

        if (response.ok) {
            alert('Heritage contribution submitted successfully!');
            document.getElementById("heritage-dialog").style.display = 'none'; // Close modal
        } else {
            alert('Error submitting heritage contribution: ' + await response.text());
            console.log(await response.text());
        }
    } catch (error) {
        alert('Network error: ' + error);
    }
});
