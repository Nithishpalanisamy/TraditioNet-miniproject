// footer.js
document.addEventListener("DOMContentLoaded", function() {
    const footer = `
      <footer class="footer bg-dark text-white pt-4">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <br>
              <p>Developed By Nithish & Muthu Raja<br>MCA Department, PSG Tech</p>
              <div class="social-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fas fa-envelope"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
            <div class="col-md-4">
              <h5>Pages</h5>
              <ul class="list-unstyled">
                <li><a href="home.html">Home</a></li>
                <li><a href="explore.html">Heritage sites</a></li>
                <li><a href="interact.html">Engage</a></li>
                <li><a href="maps.html">Maps</a></li>
                <li><a href="contact.html">Contact us</a></li>
                <li><a href="about.html">About us</a></li>
              </ul>
            </div>
            <div class="col-md-4">
              <h5>Important Links</h5>
              <ul class="list-unstyled">
                <li><a href="https://indianculture.gov.in/">Indian Culture</a></li>
                <li><a href="https://www.incredibleindia.org/content/incredible-india-v2/en.html">Incredible!ndia</a></li>
                <li><a href="http://www.indiaculture.nic.in/hi">Ministry of Culture</a></li>
                <li><a href="https://swachhbharatmission.gov.in/SBMCMS/index.htm">Swachh Bharat</a></li>
              </ul>
            </div>
          </div>
          <div class="text-center mt-3">
            <hr class="bg-white">
            <p>Copyright © 2024 All rights reserved</p>
          </div>
        </div>
      </footer>
    `;
  
    // Insert the footer HTML into a div with an ID (like 'footer-container')
    document.getElementById('footer-container').innerHTML = footer;
  });
  