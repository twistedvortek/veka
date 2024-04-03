document.addEventListener("DOMContentLoaded", function() {
    // Dark/Light Mode Toggle
    const toggle = document.getElementById('dark-light-toggle');
    toggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    });

    // Manage Loading Screen Visibility
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 3000); // Adjust the loading time as needed

    // Slider Functionality for Hero Section
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slider .slide');
    function showSlide(index) {
        slides.forEach((slide, idx) => {
            slide.style.display = idx === index ? 'block' : 'none';
        });
    }

    // Initially display the first slide
    showSlide(currentSlideIndex);

    // Function to go to the next slide
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    // Auto-slide functionality
    setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Adjustments for News Section in Light Mode
    function adjustNewsSizeForLightMode() {
        const mainNews = document.querySelector('.main-news');
        const otherNews = document.querySelectorAll('.other-news .article');
        if (document.body.classList.contains('light-mode')) {
            mainNews.style.fontSize = '1.2rem'; // Making text bigger in light mode
            otherNews.forEach(article => {
                article.style.fontSize = '1.1rem'; // Making text bigger in light mode
            });
        } else {
            // Reset to default sizes when switching back to dark mode
            mainNews.style.fontSize = ''; // Reset to CSS-defined size
            otherNews.forEach(article => {
                article.style.fontSize = ''; // Reset to CSS-defined size
            });
        }
    }

    // Listen for changes in mode to adjust news section sizes accordingly
    toggle.addEventListener('change', adjustNewsSizeForLightMode);

    // Adjust footer column layout for responsiveness
    function adjustFooterColumns() {
        const footerColumns = document.querySelectorAll('footer .footer-column:not(:first-child)');
        if (window.innerWidth < 768) {
            footerColumns.forEach(column => {
                column.style.flexDirection = 'column';
            });
        } else {
            footerColumns.forEach(column => {
                column.style.flexDirection = 'row';
            });
        }
    }

    // Call on initial load and on window resize
    adjustFooterColumns();
    window.addEventListener('resize', adjustFooterColumns);
});
