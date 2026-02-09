// ==========================================
// NAVIGATION
// ==========================================
 
// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;
 
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});
 
// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
 
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});
 
// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
 
// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
 
// ==========================================
// ANIMATED SCROLL EFFECTS (AOS)
// ==========================================
 
class AnimateOnScroll {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.windowHeight = window.innerHeight;
        this.init();
    }
    
    init() {
        this.checkElements();
        window.addEventListener('scroll', () => this.checkElements());
        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
            this.checkElements();
        });
    }
    
    checkElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < this.windowHeight - elementVisible) {
                element.classList.add('aos-animate');
            }
        });
    }
}
 
// Initialize AOS
const aos = new AnimateOnScroll();
 
// ==========================================
// PARALLAX SCROLLING
// ==========================================
 
const floatingSpices = document.querySelectorAll('.floating-spice');
 
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    floatingSpices.forEach((spice, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        spice.style.transform = `translateY(${yPos}px)`;
    });
});
 
// ==========================================
// PRODUCT CARDS 3D TILT EFFECT
// ==========================================
 
class Card3D {
    constructor(card) {
        this.card = card;
        this.cardInner = card.querySelector('.product-card-inner');
        this.init();
    }
    
    init() {
        this.card.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.card.addEventListener('mouseleave', () => this.handleMouseLeave());
    }
    
    handleMouseMove(e) {
        const rect = this.card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.cardInner.style.transform = `
            translateY(-15px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
    }
    
    handleMouseLeave() {
        this.cardInner.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    }
}
 
// Initialize 3D cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => new Card3D(card));
 
// ==========================================
// REASON CARDS STAGGER ANIMATION
// ==========================================
 
const reasonCards = document.querySelectorAll('.reason-card');
 
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};
 
const reasonObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            reasonObserver.unobserve(entry.target);
        }
    });
}, observerOptions);
 
reasonCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    reasonObserver.observe(card);
});
 
// ==========================================
// CONTACT FORM HANDLING
// ==========================================
 
const contactForm = document.getElementById('contactForm');
 
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success state
        submitButton.textContent = '✓ Message Sent!';
        submitButton.style.background = 'linear-gradient(135deg, var(--primary-green-lighter), var(--primary-green-light))';
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thank you for contacting us! We\'ll get back to you soon.';
        contactForm.insertAdjacentElement('beforebegin', successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            successMessage.remove();
        }, 3000);
        
        // Log form data (in production, send to backend)
        console.log('Form submitted:', formData);
    }, 1500);
});
 
// Form input animations
const formInputs = document.querySelectorAll('.form-input');
 
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});
 
// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================
 
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-yellow), var(--primary-green-light));
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}
 
createScrollProgressBar();
 
// ==========================================
// DYNAMIC COUNTER ANIMATION
// ==========================================
 
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.hasAnimated = false;
    }
    
    animate() {
        if (this.hasAnimated) return;
        this.hasAnimated = true;
        
        const start = 0;
        const increment = this.target / (this.duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= this.target) {
                this.element.textContent = this.formatNumber(this.target);
                clearInterval(timer);
            } else {
                this.element.textContent = this.formatNumber(Math.floor(current));
            }
        }, 16);
    }
    
    formatNumber(num) {
        const originalText = this.element.textContent;
        if (originalText.includes('+')) {
            return num + '+';
        } else if (originalText.includes('%')) {
            return num + '%';
        }
        return num;
    }
}
 
// Animate visual cards numbers
const visualCards = document.querySelectorAll('.card-number');
const visualCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const counter = new CounterAnimation(entry.target, number, 2000);
            counter.animate();
            visualCardsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
 
visualCards.forEach(card => visualCardsObserver.observe(card));
 
// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
 
const buttons = document.querySelectorAll('.btn');
 
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});
 
// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
 
// ==========================================
// LAZY LOADING OPTIMIZATION
// ==========================================
 
// Optimize images if any are added
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});
 
lazyImages.forEach(img => imageObserver.observe(img));
 
// ==========================================
// CURSOR TRAIL EFFECT (SUBTLE)
// ==========================================
 
class CursorTrail {
    constructor() {
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        // Only on desktop
        if (window.innerWidth < 768) return;
        
        // Create cursor dots
        for (let i = 0; i < 10; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--accent-yellow);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - i * 0.1};
                transition: transform 0.2s ease;
            `;
            document.body.appendChild(dot);
            this.dots.push({ element: dot, x: 0, y: 0 });
        }
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.animate();
    }
    
    animate() {
        let x = this.mouse.x;
        let y = this.mouse.y;
        
        this.dots.forEach((dot, index) => {
            dot.x += (x - dot.x) * 0.3;
            dot.y += (y - dot.y) * 0.3;
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
            x = dot.x;
            y = dot.y;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}
 
// Initialize cursor trail
// new CursorTrail(); // Uncomment for cursor trail effect
 
// ==========================================
// PERFORMANCE MONITORING
// ==========================================
 
// Log performance metrics
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});
 
// ==========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ==========================================
 
const sections = document.querySelectorAll('section[id]');
 
function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}
 
window.addEventListener('scroll', highlightNavLink);
 
// Add active link styles
const navLinkStyle = document.createElement('style');
navLinkStyle.textContent = `
    .nav-link.active {
        color: var(--primary-green);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navLinkStyle);
 
// ==========================================
// HERO PARALLAX EFFECT
// ==========================================
 
const heroContent = document.querySelector('.hero-content');
 
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});
 
// ==========================================
// INTERSECTION OBSERVER FOR SECTIONS
// ==========================================
 
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.15
});
 
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});
 
// Add section visibility styles
const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    section.section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(sectionStyle);
 
// ==========================================
// PRELOADER (OPTIONAL)
// ==========================================
 
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        inset: 0;
        background: var(--off-white);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 4px solid var(--light-gray);
        border-top-color: var(--accent-yellow);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    `;
    
    preloader.appendChild(spinner);
    document.body.appendChild(preloader);
    
    const spinAnimation = document.createElement('style');
    spinAnimation.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinAnimation);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }, 500);
    });
}
 
// Uncomment to enable preloader
// createPreloader();
 
// ==========================================
// UTILITY FUNCTIONS
// ==========================================
 
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
 
// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
 
// Smooth reveal on page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
 
// ==========================================
// CONSOLE BRANDING
// ==========================================
 
console.log(
    '%c🌿 Samriddhi Udyog Masala 🌿',
    'font-size: 24px; font-weight: bold; color: #4a7c2c; font-family: "Playfair Display", serif;'
);
console.log(
    '%cFrom an Assam Village to Your Kitchen',
    'font-size: 14px; color: #f4a825; font-weight: 600;'
);
console.log(
    '%c100% Organic • No Chemicals • Made with Love',
    'font-size: 12px; color: #6fa842;'
);