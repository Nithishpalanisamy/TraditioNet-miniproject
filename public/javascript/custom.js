
/*----------------------localstorage-----------------------*/
// Function to update the button based on login status
function updateAuthButton() {
	const authButton = document.getElementById('auth-button');
	const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
	if (isLoggedIn) {
	  authButton.textContent = 'Logout';
	} else {
	  authButton.textContent = 'Login';
	}
  }
  
  // Function to handle button click
  function handleAuthButtonClick() {
	const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
	if (isLoggedIn) {
	  // Logout: remove login status and refresh the page
	  localStorage.removeItem('isLoggedIn');
	  updateAuthButton();
	  location.reload();
	} else {
	  // Redirect to login page
	  window.location.href = 'login.html';
	}
  }
  
  // Initialize the button when the page loads
  document.addEventListener('DOMContentLoaded', () => {
	updateAuthButton();
	document.getElementById('auth-button').addEventListener('click', handleAuthButtonClick);
  });
  



$(function () {
	
	"use strict";
	
	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	window.addEventListener('load', function() {
		// Ensure the loader is hidden once the page is fully loaded
		document.querySelector('.loader_bg').style.display = 'none';
	});
	
	document.addEventListener('DOMContentLoaded', function() {
		// Ensure the loader is hidden once the DOM is fully loaded
		document.querySelector('.loader_bg').style.display = 'none';
	});
	
	setTimeout(function() {
		// Hide the loader after 5 seconds in case the page loads quickly
		document.querySelector('.loader_bg').style.display = 'none';
	}, 5000); // 5 seconds
	
     /* Product slider 
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     // optional
     $('#blogCarousel').carousel({
        interval: 5000
     });


});
