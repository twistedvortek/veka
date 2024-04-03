document.addEventListener("DOMContentLoaded", function() {
    // Function to hide the loading screen and show the main content
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        if (loadingScreen && mainContent) {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
        }
    }

    // Simulate a loading time (e.g., 2 seconds) then hide the loading screen
    setTimeout(hideLoadingScreen, 2500);

    // Functionality for light/dark mode switch
    const modeSwitch = document.getElementById('mode-switch'); // Assuming there's a switch in your HTML
    if (modeSwitch) {
        modeSwitch.addEventListener('click', function() {
            const body = document.body;
            body.classList.toggle('light-mode'); // Add 'light-mode' class for light mode styles
            
            // Update styles based on mode
            if (body.classList.contains('light-mode')) {
                // Apply light mode styles
                body.style.backgroundColor = '#FFFFFF'; // Example light background
                body.style.color = '#23272A'; // Example dark text color for light mode
                // Add other light mode style changes here
            } else {
                // Revert to dark mode styles
                body.style.backgroundColor = '#23272A'; // Dark background
                body.style.color = '#FFFFFF'; // Light text color
                // Add other dark mode style changes here
            }
        });
    }
    
    // Additional JavaScript functionality can go here
    // For example, sliders, navigation menu responsiveness, etc.
});
