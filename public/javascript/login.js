async function handleLogin(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {  // Corrected path
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'home.html';
    } else {
      console.error('Login failed:', data.message);
      alert('Invalid credentials');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again.');
  }
}
