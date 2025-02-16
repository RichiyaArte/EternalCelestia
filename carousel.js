// carousel.js
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds

    function nextSlide() {
        // Add 'previous' class to current slide
        slides[currentSlide].classList.add('previous');
        // Remove 'active' class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Remove 'previous' class and add 'active' class to new slide
        slides[currentSlide].classList.remove('previous');
        slides[currentSlide].classList.add('active');

        // Clean up previous slide's classes after animation
        setTimeout(() => {
            slides.forEach((slide, index) => {
                if (index !== currentSlide) {
                    slide.classList.remove('previous');
                }
            });
        }, 1000);
    }

    // Start the automatic slideshow
    setInterval(nextSlide, slideInterval);
});