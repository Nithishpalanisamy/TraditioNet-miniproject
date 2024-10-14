// navbar.js

document.addEventListener('DOMContentLoaded', function () {
    const header = `
        <header>
            <nav class="navbar navbar-expand-lg navbar-custom">
                <a class="navbar-brand" href="#">TraditioNet</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="home.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="explore.html">Heritage</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/blogpost">Blogs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="maps.html">Maps</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contact.html">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">About</a>
                        </li>
                    </ul>
                </div>
                <div id="auth-container"></div>
            </nav>
        </header>
    `;

    document.getElementById('header-container').innerHTML = header;

    const user = JSON.parse(localStorage.getItem('user'));
    const authContainer = document.getElementById('auth-container');

    if (user) {
        // User is logged in
        authContainer.innerHTML = `<img src="images/i2.jpg" alt="User Image" class="user-image" />`;
    } else {
        // User is not logged in
        authContainer.innerHTML = `<button class="btn" id="signin-button" type="button">Sign In</button>`;
        document.getElementById('signin-button').addEventListener('click', () => {
            window.location.href = 'login.html'; // Redirect to the login page
        });
    }
});
