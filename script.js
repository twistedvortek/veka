window.addEventListener('load', function() {
    document.getElementById('loading-screen').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function () {
    // Dark/Light Mode Toggle with Text Update
    const modeToggle = document.querySelector('.theme-toggle-btn');
    const modeToggleText = document.querySelector('.theme-toggle-text'); // Assuming you have a span or div for the text
    updateModeText(); // Initial update

    modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        // Update icon based on mode
        const icon = this.querySelector('ion-icon');
        if (document.body.classList.contains('light-mode')) {
            icon.name = 'sunny';
            modeToggleText.textContent = 'Light Mode'; // Update text
        } else {
            icon.name = 'moon';
            modeToggleText.textContent = 'Dark Mode'; // Update text
        }
    });

    function updateModeText() {
        if (document.body.classList.contains('light-mode')) {
            modeToggleText.textContent = 'Light Mode';
        } else {
            modeToggleText.textContent = 'Dark Mode';
        }
    }

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

    // Language Dropdown Toggle with Flags and Text
    document.querySelectorAll('.language-dropdown .dropbtn').forEach(dropbtn => {
        dropbtn.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('show');
            // Close other open dropdowns
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                if (dropdown !== this.nextElementSibling && dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            });
        });
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

    // Twitch Embed
    const twitchEmbed = document.getElementById('twitch-embed');
    if (twitchEmbed) {
        const channels = ["votekacademy", "twistedvortek", "aplesports", "darkriftesports"];
        document.querySelectorAll('.channel-name').forEach(item => {
            item.addEventListener('click', event => {
                const channelName = event.target.getAttribute('data-channel');
                if (channels.includes(channelName)) {
                    twitchEmbed.src = `https://player.twitch.tv/?channel=${channelName}&parent=yourdomain.com&muted=true`;
                }
            });
        });
    }

    // Handling footer and main content layout
    const footerColumns = document.querySelectorAll('.footer-column');
    if (window.innerWidth > 768) { // Assuming you want to adjust layout for wider screens
        footerColumns.forEach(column => {
            column.style.flex = '1'; // Adjust according to your layout needs
        });
    }
    
    // Update mode text and icon on load based on current theme
    function updateModeToggle() {
        const isLightMode = document.body.classList.contains('light-mode');
        modeToggle.querySelector('ion-icon').name = isLightMode ? 'sunny' : 'moon';
        modeToggleText.textContent = isLightMode ? 'Light Mode' : 'Dark Mode'; // Assuming .theme-toggle-text exists
    }

    updateModeToggle(); // Call at start to ensure correct text/icon are shown

    // Ensure the theme toggle reflects the actual theme when the page loads
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    modeToggle.setAttribute('data-mode', currentTheme);

    // Additional content and layout adjustments...
    // Add any further JS-driven layout or interactive enhancements here
});
