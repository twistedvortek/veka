document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check if dark mode is set in local storage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        darkModeToggle.checked = true;
        body.classList.add('dark-mode');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('change', function () {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', null);
        }
    });

    // Function to update progress bar
    function updateProgressBar(statId, progressBarId, progress) {
        const stat = document.getElementById(statId);
        const progressBar = document.getElementById(progressBarId);
        stat.textContent = progress;
        progressBar.style.width = `${progress}%`;
    }

    // Function to update live stats
    function updateLiveStats() {
        // Update current speed
        updateProgressBar('current-speed', 'progress-bar', mockData.currentSpeed);

        // Update current duration
        document.getElementById('current-duration').textContent = formatTime(mockData.currentDuration);

        // Update driving behaviour
        updateDrivingBehaviour('driving-behaviour', mockData.drivingBehaviour);

        // Update current traffic
        updateProgressBar('current-traffic', 'traffic-progress-bar', mockData.currentTraffic);

        // Update current location
        document.getElementById('current-location').textContent = mockData.currentLocation;
        updateMap('map', mockData.currentLocation);
    }

    // Function to update weekly stats
    function updateWeeklyStats() {
        // Update weekly speed
        document.getElementById('weekly-current-speed').textContent = mockData.weeklySpeed;

        // Update weekly duration
        document.getElementById('weekly-current-duration').textContent = formatTime(mockData.weeklyDuration);

        // Update weekly behaviour
        updateDrivingBehaviour('weekly-driving-behaviour', mockData.weeklyBehaviour);

        // Update weekly traffic
        document.getElementById('weekly-current-traffic').textContent = mockData.weeklyTraffic;

        // Update weekly location
        document.getElementById('weekly-current-location').textContent = mockData.weeklyLocation;
        updateMap('weekly-map', mockData.weeklyLocation);
    }

    // Initial update
    updateLiveStats();
    updateWeeklyStats();

    // Set intervals for updates
    setInterval(updateLiveStats, updateInterval);
    setInterval(updateWeeklyStats, updateInterval * 3); // Weekly stats update less frequently

    // Simulate moving bar line
    setInterval(function () {
        let progressBar = document.getElementById('progress-bar');
        let currentWidth = parseInt(progressBar.style.width) || 0;
        let newWidth = (currentWidth + 5) % 100; // Move by 5% increments
        progressBar.style.width = newWidth + '%';
    }, 500); // Move every 0.5 seconds

    // Format time as hh:mm:ss
    function formatTime(durationInSeconds) {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update driving behaviour text and color
    function updateDrivingBehaviour(elementId, behaviour) {
        const element = document.getElementById(elementId);
        element.textContent = behaviour;

        // Update color based on behaviour
        if (behaviour === 'Good') {
            element.style.color = '#008000'; // Green
        } else if (behaviour === 'Moderate') {
            element.style.color = '#FFA500'; // Orange
        } else {
            element.style.color = '#FF0000'; // Red
        }
    }

    // Initialize Google Maps
    function initMap() {
        // Set up the map for live stats
        const mapOptions = {
            zoom: 12,
            center: {
                lat: 53.4084,
                lng: -2.9916
            }
        };
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Set up the map for weekly stats
        const weeklyMapOptions = {
            zoom: 12,
            center: {
                lat: 53.4084,
                lng: -2.9916
            }
        };
        const weeklyMap = new google.maps.Map(document.getElementById('weekly-map'), weeklyMapOptions);

        // Add markers for live and weekly stats
        addMarker(map, mockData.currentLocation);
        addMarker(weeklyMap, mockData.weeklyLocation);
    }

    // Function to add a marker to the map
    function addMarker(map, location) {
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            'address': location
        }, function (results, status) {
            if (status === 'OK') {
                const marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    // Update the map with a new location
    function updateMap(mapId, location) {
        const map = new google.maps.Map(document.getElementById(mapId), {
            zoom: 12,
            center: {
                lat: 53.4084,
                lng: -2.9916
            }
        });

        addMarker(map, location);
    }
});

// Mock data for testing
const mockData = {
    currentSpeed: 75,
    currentDuration: 3600,
    drivingBehaviour: 'Good',
    currentTraffic: 50,
    currentLocation: 'Liverpool, UK',
    weeklySpeed: 65,
    weeklyDuration: 7200,
    weeklyBehaviour: 'Moderate',
    weeklyTraffic: 75,
    weeklyLocation: 'Manchester, UK'
};

// Update interval in milliseconds
const updateInterval = 5000; // 5 seconds
