// Get the modal
var modal = document.getElementById("postFormDialog");

// Get the button that opens the modal
var btn = document.getElementById("createPostBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Fetch username and email from localStorage when the modal opens
document.getElementById('createPostBtn').addEventListener('click', function() {
    // Get the user object from localStorage
    const user = localStorage.getItem('user');

    // Parse the user object to access email and username
    let username = '';
    let email = '';
    if (user) {
        const userData = JSON.parse(user); // Parse the JSON string
        username = userData.username || ''; // Extract username or fallback to empty
        email = userData.email || ''; // Extract email or fallback to empty
    }

    // Log to console for debugging
    console.log('Username:', username);
    console.log('Email:', email);

    // Set the values in the input fields
    document.getElementById('username').value = username;
    document.getElementById('email').value = email;

    // Display the modal
    document.getElementById('postFormDialog').style.display = 'block';
});

// Close the modal when the close button is clicked
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('postFormDialog').style.display = 'none';
});

// Optional: Close the modal if clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('postFormDialog');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

function reportPost(postId, postEmail) {
    // Get the current user object from localStorage
    const user = localStorage.getItem('user');
    if (!user) {
        alert('You need to be logged in to report a post.');
        return;
    }

    const userData = JSON.parse(user);
    const userEmail = userData.email;

    // Check if the user is trying to report their own post
    if (userEmail === postEmail) {
        alert('You cannot report your own post.');
        return;
    }

    const reason = prompt("Please enter the reason for reporting this post:");
    if (reason) {
        fetch('/admin/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId, reason, userEmail }), // Include userEmail in the body
        })
        .then(response => {
            if (response.ok) {
                alert('Post reported successfully.');
            } else {
                response.json().then(data => alert(data.error));
            }
        })
        .catch(error => {
            console.error('Error reporting post:', error);
            alert('Failed to report post: ' + error.message);
        });
    }
}
