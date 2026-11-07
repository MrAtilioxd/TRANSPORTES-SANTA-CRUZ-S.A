document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-menu .dropdown-item');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== "#" && linkPath !== "../index.html" && linkPath !== "index.html") {
            link.classList.add('active');
        } else if ((currentLocation.endsWith("/") || currentLocation.endsWith("index.html")) && (linkPath === "index.html" || linkPath === "../index.html")) {
            link.classList.add('active');
        }
    });

    window.addEventListener("scroll", function() {
        let scrollPosition = window.scrollY;
        if (scrollPosition > 300) {

        }
    });
});