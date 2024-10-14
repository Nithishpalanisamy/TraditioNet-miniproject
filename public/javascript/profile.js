// Get modal elements
const modal = document.getElementById("edit-profile-modal");
const btn = document.getElementById("edit-profile-button");
const span = document.getElementsByClassName("close")[0];

// Open the modal when the button is clicked
btn.onclick = function() {
    modal.style.display = "block";
}

// Close the modal when the close button (x) is clicked
span.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when the user clicks outside the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Image preview functionality
document.getElementById('profile-image').addEventListener('change', function(event) {
    const imagePreview = document.getElementById('image-preview-img');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        imagePreview.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        imagePreview.src = '/images/photo.jpeg';
    }
});

// Set default image if none is selected
const profileImage = document.getElementById('display-profile-image');
if (!profileImage.src || profileImage.src === window.location.href) {
    profileImage.src = '/images/photo.jpeg';
}

const previewImage = document.getElementById('image-preview-img');
if (!previewImage.src || previewImage.src === window.location.href) {
    previewImage.src = '/images/photo.jpeg';
}
