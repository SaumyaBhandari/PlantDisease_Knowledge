// Scroll every 5 seconds
const interval = 5000;

// Duration of scrolling in milliseconds (1 hour = 3600000 milliseconds)
const duration = 3600000;

// Start time
const startTime = Date.now();

// Scroll function
function scrollPage() {
  window.scrollBy(0, window.innerHeight);
}

// Loop to scroll the page every `interval` seconds
const scrollInterval = setInterval(scrollPage, interval);

// Stop scrolling after `duration` milliseconds
setTimeout(() => {
  clearInterval(scrollInterval);
}, duration);