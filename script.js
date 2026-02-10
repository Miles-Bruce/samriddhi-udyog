/* 
   Samriddhi Udyog Masala
   Interactivity Script
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMenu() {
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);

        // Close menu when clicking loop
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // 2. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 4. Hero Branding Animation (Canvas)
    // Creates a subtle, organic "spice particle" float effect
    const canvas = document.getElementById('canvas-container');
    if (canvas) {
        // Create canvas context
        const ctx = document.createElement('canvas').getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        // Replace div with actual canvas element
        const realCanvas = document.createElement('canvas');
        canvas.appendChild(realCanvas);
        const ca = realCanvas.getContext('2d');

        let width, height;
        let particles = [];

        // Colors from palette (with opacity)
        const colors = [
            'rgba(124, 144, 130, 0.4)', // Green
            'rgba(244, 211, 94, 0.4)',  // Yellow
            'rgba(230, 57, 70, 0.2)',   // Red (subtle accent)
            'rgba(255, 255, 255, 0.5)'  // White
        ];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            realCanvas.width = width * dpr;
            realCanvas.height = height * dpr;
            realCanvas.style.width = width + 'px';
            realCanvas.style.height = height + 'px';
            ca.scale(dpr, dpr);
            initParticles();
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 20 + 5; // Organic varied sizes
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.angle = Math.random() * Math.PI * 2;
                this.spin = Math.random() * 0.02 - 0.01;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.angle += this.spin;

                // Wrap around screen
                if (this.x > width + 50) this.x = -50;
                if (this.x < -50) this.x = width + 50;
                if (this.y > height + 50) this.y = -50;
                if (this.y < -50) this.y = height + 50;
            }

            draw() {
                ca.save();
                ca.translate(this.x, this.y);
                ca.rotate(this.angle);
                ca.fillStyle = this.color;

                // Draw organic blob shape
                ca.beginPath();
                // Simple amorphous shape (circle-ish)
                ca.arc(0, 0, this.size, 0, Math.PI * 2);
                ca.fill();

                ca.restore();
            }
        }

        function initParticles() {
            particles = [];
            const particleCount = width < 768 ? 15 : 30; // Fewer on mobile
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ca.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    }
});
