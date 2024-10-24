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
              <a class="nav-link" href="/home.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/explore.html">Heritage</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/blogpost">Blogs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/maps.html">Maps</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contact.html">Contact</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about.html">About</a>
            </li>
          </ul>
        </div>
        <div id="auth-container" class="dropdown"></div>
      </nav>
    </header>
  `;

  document.getElementById('header-container').innerHTML = header;

  const user = JSON.parse(localStorage.getItem('user'));
  const authContainer = document.getElementById('auth-container');

  if (user && user.email) {
    if (user.email === 'nithish162965@gmail.com') {
      const adminButton = `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="adminDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Admin
          </a>
          <div class="dropdown-menu" aria-labelledby="adminDropdown">
            <a class="dropdown-item" href="/contributions">Contributions</a>
            <a class="dropdown-item" href="/admin/report">Reports</a>
          </div>
        </li>
      `;
      document.querySelector('.navbar-nav').innerHTML += adminButton;
      attachAdminDropdownEventListener();
    }

    fetch(`/profile/json/${encodeURIComponent(user.email)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(profile => {
        const userImage = profile.userphoto || 'images/i2.jpg';
        displayUserDropdown(userImage, user.email);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        displayUserDropdown('images/i2.jpg', user.email);
      });
  } else {
    authContainer.innerHTML = `<button class="btn" id="signin-button" type="button">Sign In</button>`;
    document.getElementById('signin-button').addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
});

function attachAdminDropdownEventListener() {
  document.getElementById('adminDropdown').addEventListener('click', function () {
    const dropdownMenu = this.nextElementSibling;
    dropdownMenu.classList.toggle('show');
  });
}

function displayUserDropdown(userImage, email) {
  const authContainer = document.getElementById('auth-container');
  authContainer.innerHTML = `
    <div class="dropdown">
      <img src="${userImage}" alt="User Image" class="user-image" id="user-image" />
      <div class="dropdown-content">
        <a href="/profile/${encodeURIComponent(email)}">Profile</a>
        <a href="#" id="logout-link">Logout</a>
      </div>
    </div>
  `;

  const dropdownContent = document.querySelector('.dropdown-content');

  document.getElementById('user-image').addEventListener('click', function () {
    dropdownContent.classList.toggle('show');
  });

  document.getElementById('logout-link').addEventListener('click', function () {
    logout();
  });
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'home.html';
}

window.onclick = function(event) {
  if (!event.target.matches('.user-image')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
