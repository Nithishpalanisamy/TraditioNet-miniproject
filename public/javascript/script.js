document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup form');
    const loginForm = document.querySelector('.login form');

    // Handle Signup Form Submission
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = signupForm.querySelector('input[type="email"]').value;
            const password = signupForm.querySelector('input[name="password"]').value;
            const confirmPassword = signupForm.querySelector('input[name="confirmPassword"]').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, confirmPassword })
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Signup successful');
                    window.location.href = 'login.html';
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.error('Error:', err);
            }
        });
    }

    // Handle Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[name="password"]').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token); // Save token to localStorage
                    alert('Login successful');
                    window.location.href = 'home.html';
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.error('Error:', err);
            }
        });
    }
});


