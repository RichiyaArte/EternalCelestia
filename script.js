// Function to create and manage a starry night canvas
function createStarryNight(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const stars = [];
    const shootingStars = [];

    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }

    // Initial resize and event listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createBackgroundStars() {
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                opacity: Math.random()
            });
        }
    }

    function createShootingStar() {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.5,
            length: Math.random() * 150 + 50,
            speedX: Math.random() * 7 + 3,
            speedY: Math.random() * 7 + 3,
            opacity: 1,
            width: Math.random() * 3 + 1
        });
    }

    function drawBackgroundStars() {
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
        });
    }

    function drawShootingStars() {
        for (let i = 0; i < shootingStars.length; i++) {
            const star = shootingStars[i];
            
            const gradient = ctx.createLinearGradient(
                star.x, star.y, 
                star.x - star.length, star.y - star.length
            );
            gradient.addColorStop(0, `rgba(255, 215, 0, ${star.opacity})`);
            gradient.addColorStop(1, `rgba(255, 215, 0, 0)`);
            
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star.x - star.length, star.y - star.length);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = star.width;
            ctx.lineCap = 'round';
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.width, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${star.opacity})`;
            ctx.fill();
            
            star.x += star.speedX;
            star.y += star.speedY;
            star.opacity -= 0.02;
            
            if (star.opacity <= 0 || 
                star.x < 0 || star.x > canvas.width || 
                star.y < 0 || star.y > canvas.height) {
                shootingStars.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.97)'; // Slightly transparent black for better blending
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drawBackgroundStars();
        drawShootingStars();
        
        requestAnimationFrame(animate);
    }

    // Initialize the canvas
    createBackgroundStars();
    setInterval(createShootingStar, 1000);
    animate();
}

// Initialize all canvases when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
    createStarryNight('hero-starry-night');
    createStarryNight('about-starry-night');
    createStarryNight('prologues-starry-night');
});