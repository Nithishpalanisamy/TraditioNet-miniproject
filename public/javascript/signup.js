document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const uname = e.target.uname.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;

  const response = await fetch('/api/auth/signup', { // Updated path
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, uname, password, confirmPassword }),
  });

  console.log('Response Status:', response.status);
  const text = await response.text();
  console.log('Response Text:', text);

  try {
      const data = JSON.parse(text);
      if (data.message === "User registered successfully") {
          alert('Signup successful!');
          window.location.href = 'login.html';
      } else {
          alert(data.message);
      }
  } catch (err) {
      console.error('Failed to parse JSON:', err);
      alert('Signup failed. Please try again.');
  }
});
