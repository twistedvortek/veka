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
  
    // Mock data and update interval
    const updateInterval = 5000; // in milliseconds
    const mockData = {
      currentSpeed: 60,
      currentDuration: 30,
      drivingBehaviour: 'Good',
      currentTraffic: 5,
      currentLocation: 'Dubai',
      weeklySpeed: 50,
      weeklyDuration: 210,
      weeklyBehaviour: 'Good',
      weeklyTraffic: 3,
      weeklyLocation: 'Sharjah',
    };
  
    // Function to update live stats
    function updateLiveStats() {
      // Update current speed
      updateProgressBar('current-speed', 'progress-bar', mockData.currentSpeed);
  
      // Update current duration
      document.getElementById('current-duration').textContent = mockData.currentDuration;
  
      // Update driving behaviour
      document.getElementById('driving-behaviour').textContent = mockData.drivingBehaviour;
  
      // Update current traffic
      updateProgressBar('current-traffic', 'traffic-progress-bar', mockData.currentTraffic);
  
      // Update current location
      document.getElementById('current-location').textContent = mockData.currentLocation;
    }
  
    // Function to update weekly stats
    function updateWeeklyStats() {
      // Update weekly speed
      document.getElementById('weekly-current-speed').textContent = mockData.weeklySpeed;
  
      // Update weekly duration
      document.getElementById('weekly-current-duration').textContent = mockData.weeklyDuration;
  
      // Update weekly behaviour
      document.getElementById('weekly-driving-behaviour').textContent = mockData.weeklyBehaviour;
  
      // Update weekly traffic
      document.getElementById('weekly-current-traffic').textContent = mockData.weeklyTraffic;
  
      // Update weekly location
      document.getElementById('weekly-current-location').textContent = mockData.weeklyLocation;
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
  });
  