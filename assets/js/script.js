// assets/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    // Simple intersection observer for fade-in animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Function from your report.html, if still needed on specific pages
    // It's better to have specific JS for specific pages if functions are not global
});

// General function to open window, if used across multiple detail pages
function openIframeInNewTab(iframeId) {
    const iframe = document.getElementById(iframeId);
    if (iframe && iframe.src) {
        window.open(iframe.src, '_blank');
    } else {
        console.error('Iframe not found or has no src:', iframeId);
    }
}