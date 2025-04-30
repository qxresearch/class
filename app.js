window.onload = function() {
    // Get the email from the URL path
    const email = window.location.pathname.split('/')[2]; // Extract email from /classPY/john@example.com
    
    // Fetch the student schedule using email
    fetch(`https://script.google.com/macros/s/AKfycbxHM1xFqNut3WVCkw3SbcUvJjCOXhxvLD5xsC3-XEI/dev?email=${email}`)
        .then(response => response.json())
        .then(data => {
            // Display the schedule, links, and countdown
            document.getElementById("classLink").textContent = "Class Link: " + data.classLink;
            document.getElementById("classLink").href = data.classLink;  // Add href for class link

            document.getElementById("notesLink").textContent = "Notes Link: " + data.notesLink;
            document.getElementById("notesLink").href = data.notesLink;  // Add href for notes link

            document.getElementById("schedule").textContent = "Schedule: " + data.schedule;

            startCountdown(data.nextClass);
        })
        .catch(error => console.error('Error fetching data:', error));
};

function startCountdown(nextClassTime) {
    const countdownElement = document.getElementById("countdown");
    const nextClassDate = new Date(nextClassTime);

    const updateCountdown = setInterval(function() {
        const now = new Date();
        const timeRemaining = nextClassDate - now;

        if (timeRemaining <= 0) {
            countdownElement.textContent = "Next Class: Already started!";
            clearInterval(updateCountdown);
        } else {
            const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
            const seconds = Math.floor((timeRemaining / 1000) % 60);
            countdownElement.textContent = `Next Class: ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}
