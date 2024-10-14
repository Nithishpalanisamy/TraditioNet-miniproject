document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const uname = e.target.uname.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
  
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, uname, password, confirmPassword }),
    });
  
    const data = await response.json();
  
    if (data.message === "User registered successfully") {
      alert('Signup successful!');
      window.location.href = 'login.html';
    } else {
      alert(data.message);
    }
  });
  