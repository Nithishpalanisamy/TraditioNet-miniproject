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


document.addEventListener('DOMContentLoaded', function() {
    const reportButtons = document.querySelectorAll('.report-button');

    reportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id');

            if (confirm('Are you sure you want to report this post?')) {
                fetch(`/report/${postId}`, {
                    method: 'POST'
                })
                .then(response => {
                    if (response.ok) {
                        alert('Post reported successfully.');
                        location.reload(); // Reload the page to see changes
                    } else {
                        alert('Error reporting post.');
                    }
                });
            }
        });
    });
});
