document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Toggle dark mode based on local storage
    darkModeToggle.addEventListener('change', function () {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', null);
        }
    });

    // Initialize or restore dark mode from local storage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        darkModeToggle.checked = true;
        body.classList.add('dark-mode');
    }

    // Mock data for demonstration purposes
    const mockData = {
        currentSpeed: 75,
        currentDuration: 3600, // in seconds
        drivingBehaviour: 'Good',
        currentTraffic: 50, // as percentage
        currentLocation: 'Sharjah, UAE',
        weeklySpeed: 65,
        weeklyDuration: 7200, // in seconds
        weeklyBehaviour: 'Moderate',
        weeklyTraffic: 75, // as percentage
        weeklyLocation: 'Dubai, UAE'
    };

    // Function to update progress bars and stats
    function updateProgressBar(progressBarId, value) {
        const progressBar = document.getElementById(progressBarId);
        progressBar.style.width = `${value}%`;
    }

    // Format duration from seconds to HH:MM:SS
    function formatDuration(duration) {
        let seconds = duration % 60;
        let minutes = Math.floor(duration / 60) % 60;
        let hours = Math.floor(duration / 3600);
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update live stats based on mockData
    function updateLiveStats() {
        document.getElementById('current-speed').textContent = `${mockData.currentSpeed} km/h`;
        document.getElementById('current-duration').textContent = formatDuration(mockData.currentDuration);
        document.getElementById('driving-behaviour').textContent = mockData.drivingBehaviour;
        updateProgressBar('progress-bar', mockData.currentTraffic);
        document.getElementById('current-location').textContent = mockData.currentLocation;
        // Initialize Google Maps for current location
        initMap('map', mockData.currentLocation);
    }

    // Update weekly stats based on mockData
    function updateWeeklyStats() {
        document.getElementById('weekly-current-speed').textContent = `${mockData.weeklySpeed} km/h`;
        document.getElementById('weekly-current-duration').textContent = formatDuration(mockData.weeklyDuration);
        document.getElementById('weekly-driving-behaviour').textContent = mockData.weeklyBehaviour;
        updateProgressBar('traffic-progress-bar', mockData.weeklyTraffic);
        document.getElementById('weekly-current-location').textContent = mockData.weeklyLocation;
        // Initialize Google Maps for weekly location
        initMap('weekly-map', mockData.weeklyLocation);
    }

    // Call update functions to refresh stats
    updateLiveStats();
    updateWeeklyStats();

    // Function to initialize Google Maps
    function initMap(mapId, location) {
        // Dummy function for demonstration - Replace with actual Google Maps API calls
        console.log(`Initializing map ${mapId} for location ${location}. Replace this with actual Google Maps API implementation.`);
    }
});
