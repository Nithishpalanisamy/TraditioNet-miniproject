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
