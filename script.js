/* ==========================================================================
   HASSAN & SHAHEER - FRIENDSHIP WEBSITE ENGINE
   Features: Night Sky Canvas, Twinkling Stars, Golden Sprinkles, 
             Shooting Stars, Lightbox Modal, and Responsive Nav.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CANVAS PARTICLES ENGINE (Night Stars, Golden Sprinkles & Shooting Stars)
       ========================================================================== */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let shootingStars = [];
        const particleCount = 140; // Total stars and sprinkles

        // Resize Canvas to fit full screen
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Particle Class (Stars & Golden Sprinkles)
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.2;
                this.speedY = (Math.random() - 0.5) * 0.2;
                this.alpha = Math.random();
                this.alphaChange = (Math.random() * 0.015) + 0.005;
                
                // Color variation: 70% White Night Stars, 20% Gold Sprinkles, 10% Cyan Dust
                const randColor = Math.random();
                if (randColor < 0.7) {
                    this.color = '#ffffff';
                } else if (randColor < 0.9) {
                    this.color = '#ffd700'; // Gold
                } else {
                    this.color = '#00f2fe'; // Cyan
                }
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Twinkle / Glow animation
                this.alpha += this.alphaChange;
                if (this.alpha <= 0.1 || this.alpha >= 1) {
                    this.alphaChange = -this.alphaChange;
                }

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = Math.abs(this.alpha);
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // Shooting Star Class
        class ShootingStar {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * (canvas.height / 2);
                this.length = Math.random() * 80 + 40;
                this.speed = Math.random() * 10 + 6;
                this.size = Math.random() * 1.5 + 1;
                this.active = false;
            }

            spawn() {
                this.reset();
                this.active = true;
            }

            update() {
                if (!this.active) return;
                this.x += this.speed;
                this.y += this.speed * 0.5;

                // Deactivate if out of view
                if (this.x > canvas.width || this.y > canvas.height) {
                    this.active = false;
                }
            }

            draw() {
                if (!this.active) return;
                ctx.save();
                ctx.lineWidth = this.size;
                const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.length, this.y - (this.length * 0.5));
                gradient.addColorStop(0, '#ffd700');
                gradient.addColorStop(1, 'transparent');
                
                ctx.strokeStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.length, this.y - (this.length * 0.5));
                ctx.stroke();
                ctx.restore();
            }
        }

        // Initialize Particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Create 2 Shooting Stars
        const shootingStar1 = new ShootingStar();
        const shootingStar2 = new ShootingStar();

        // Randomly trigger shooting stars
        setInterval(() => {
            if (!shootingStar1.active && Math.random() < 0.6) shootingStar1.spawn();
        }, 4000);

        setInterval(() => {
            if (!shootingStar2.active && Math.random() < 0.4) shootingStar2.spawn();
        }, 7000);

        // Canvas Animation Loop
        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Stars & Sprinkles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw Shooting Stars
            shootingStar1.update();
            shootingStar1.draw();
            shootingStar2.update();
            shootingStar2.draw();

            requestAnimationFrame(animateCanvas);
        }

        animateCanvas();
    }

    /* ==========================================================================
       2. NAVBAR SCROLL EFFECT & MOBILE MENU
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 6%';
            navbar.style.background = 'rgba(7, 8, 12, 0.92)';
        } else {
            navbar.style.padding = '1.2rem 6%';
            navbar.style.background = 'rgba(7, 8, 12, 0.75)';
        }
    });

    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(7, 8, 12, 0.95)';
                navLinks.style.padding = '1.5rem 0';
                navLinks.style.textAlign = 'center';
                navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            }
        });
    }

});

/* ==========================================================================
   3. LIGHTBOX MODAL FUNCTIONS (GLOBAL)
   ========================================================================== */
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// Close Lightbox on 'Escape' key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});
          
