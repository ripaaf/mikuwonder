document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.navbar a');
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const sections = document.querySelectorAll('section');
    const elements = document.querySelectorAll('.element');

    // Smooth scroll for navbar links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // Highlight active navbar link immediately after scroll
                navLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');

                // Close navbar after clicking a link
                navbar.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Track scroll position and highlight corresponding navbar link
    const onScroll = () => {
        const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    };

    // Intersection Observer for lazy loading animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));

    // Event listeners for scroll and DOMContentLoaded
    window.addEventListener('scroll', onScroll);
    onScroll(); // Initial call to highlight active section on page load
});

// Toggle navbar menu (hamburger)
function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close the navbar when clicking outside of it
document.addEventListener('click', (event) => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const isClickInsideNavbar = navbar.contains(event.target);
    const isHamburger = event.target.closest('.hamburger');

    // Close the navbar and reset hamburger if clicking outside
    if (!isClickInsideNavbar && !isHamburger && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        hamburger.classList.remove('active'); // Reset hamburger icon
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    let hideTimeout;

    function hideNavbar() {
        // Check if we are NOT at the top of the page
        if (window.scrollY > 0) {
            navbarWrapper.classList.add('hilang'); // Hide the navbar
        }
    }

    function resetTimer() {
        // Always show the navbar when the timer resets
        navbarWrapper.classList.remove('hilang');

        // Clear any existing timeout and start a new one only if we’re scrolled down
        clearTimeout(hideTimeout);
        if (window.scrollY > 0) {
            hideTimeout = setTimeout(hideNavbar, 2000);
        }
    }

    resetTimer();

    ['mousemove', 'click', 'scroll', 'keydown'].forEach((event) => {
        document.addEventListener(event, resetTimer);
    });

    navbarWrapper.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        navbarWrapper.classList.remove('hilang');
    });

    navbarWrapper.addEventListener('mouseleave', resetTimer);
});


// Typewriter effect (Typing and erasing text)
document.addEventListener("DOMContentLoaded", function () {
    const text = "コードネーム「CV01」は「キャラクターボイス01」を意味します。";
    const element = document.getElementById("typewriter");
    let index = 0;
    let isTyping = true;

    function typeEraseEffect() {
        if (isTyping) {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
            } else {
                // Pause before starting to erase
                isTyping = false;
                setTimeout(typeEraseEffect, 1000); // Wait time before erasing starts
                return;
            }
        } else {
            if (index > 0) {
                element.innerHTML = text.substring(0, index - 1);
                index--;
            } else {
                // Reset to start typing again after erasing
                isTyping = true;
            }
        }
        setTimeout(typeEraseEffect, isTyping ? 100 : 50); // Adjust typing and erasing speed
    }

    typeEraseEffect();
});
