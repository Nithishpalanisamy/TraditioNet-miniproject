document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        const profileLink = document.getElementById('profileLink');
        profileLink.href = `/profile/${username}`;
        profileLink.textContent = 'View Profile';
    } else {
        console.error('No username found in localStorage');
    }
});
