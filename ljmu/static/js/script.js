document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Toggle dark mode and save the preference in local storage
    darkModeToggle.addEventListener('change', function () {
        body.classList.toggle('dark-mode', this.checked);
        localStorage.setItem('dark-mode', this.checked ? 'enabled' : 'disabled');
    });

    // Check local storage for dark mode preference on page load
    if (localStorage.getItem('dark-mode') === 'enabled') {
        darkModeToggle.checked = true;
        body.classList.add('dark-mode');
    }

    // Control videos function
    window.controlVideos = function (section, action) {
        // Query all iframe elements within the specified section
        const iframes = document.querySelectorAll(`.${section} .video-container iframe`);
        
        iframes.forEach(iframe => {
            // Construct the new src URL based on the desired action
            let src = iframe.src;
            src = action === 'play' ? src.replace("&autoplay=0", "&autoplay=1") : src.replace("&autoplay=1", "&autoplay=0");
            iframe.src = src;
        });
    };
});

function updateResults(data) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = ''; // Clear previous results
    data.objects.forEach(obj => {
        const div = document.createElement('div');
        div.textContent = `Detected: ${obj.type} at ${obj.location}`;
        resultsSection.appendChild(div);
    });
}

function checkStatus(taskId) {
    $.getJSON($SCRIPT_ROOT + '/status/' + taskId, function(data) {
        if (data.state == 'PROGRESS' || data.state == 'PENDING') {
            var progress = parseInt(data.current / data.total * 100, 10);
            $('#progress-bar').css('width', progress + '%');
            $('#progress-bar').text(progress + '%');
        } else if (data.state == 'SUCCESS') {
            clearInterval(statusInterval);
            $('#progress-bar').css('width', '100%');
            $('#progress-bar').text('100%');
            // Update page to show processed video
        }
    });
}

// Trigger the status check after uploading the file
var taskId = ''; // Assign the task ID returned from the server after upload
var statusInterval = setInterval(function() { checkStatus(taskId); }, 1000);
