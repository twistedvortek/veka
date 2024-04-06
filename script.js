document.addEventListener('DOMContentLoaded', function () {
    // Dark/Light Mode Toggle
    const modeToggle = document.querySelector('.theme-toggle-btn');
    modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        // Update icon based on mode
        const icon = this.querySelector('ion-icon');
        if (document.body.classList.contains('light-mode')) {
            icon.name = 'sunny';
        } else {
            icon.name = 'moon';
        }
    });

    // Initialize Hero Slider
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.hero-slider .slide');
    const nextSlide = () => {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].classList.add('active');
    };

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Persistent Header Adjustment
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Language Dropdown Toggle
    const languageDropdown = document.querySelector('.language-dropdown .dropbtn');
    languageDropdown.addEventListener('click', function() {
        this.nextElementSibling.classList.toggle('show');
    });

    // Click Event to Close Dropdowns if Clicked Outside
    window.addEventListener('click', function(e) {
        if (!e.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    });
// Example functionality for Twitch Embeds - Adjust as necessary
// This assumes you have an element with the id 'twitch-embed' for the Twitch iframe
const twitchEmbed = document.getElementById('twitch-embed');
if (twitchEmbed) {
    const channels = ["votekacademy", "twistedvortek", "aplesports", "darkriftesports"];
    // This example could switch the Twitch channel based on some interaction, e.g., clicking a channel name
    document.querySelectorAll('.channel-name').forEach(item => {
        item.addEventListener('click', event => {
            const channelName = event.target.getAttribute('data-channel');
            if (channels.includes(channelName)) {
                twitchEmbed.src = `https://player.twitch.tv/?channel=${channelName}&parent=yourdomain.com&muted=true`;
            }
        });
    });
}

// Add event listeners for any other interactive elements
// For example, handling clicks on news articles, toggling sections, etc.

// Persistent Header Scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        header.classList.add('is-scrolling');
    } else {
        header.classList.remove('is-scrolling');
    }
});

// Light/Dark Mode Toggle
const modeSwitch = document.querySelector('.mode-switch input[type="checkbox"]');
modeSwitch.addEventListener('change', () => {
    if (modeSwitch.checked) {
        document.body.setAttribute('data-theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
    }
});

// Initialize any sliders, modals, or interactive components here

// Remember to adapt the code based on the actual structure and IDs/classes of your HTML elements.
// This script assumes certain IDs and classes are in place based on the previous context provided.