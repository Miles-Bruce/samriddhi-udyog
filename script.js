<<<<<<< HEAD
// Samriddhi Udyog Masala Website JavaScript
// Modern animations, interactions, and smooth scrolling
// Optimized for mobile performance and Vercel deployment

(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowPowerDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;

    // Initialize when DOM is ready
    function init() {
        // Initialize Lucide icons with error handling
        initIcons();
        
        // Initialize all components
        initNavigation();
        initScrollEffects();
        initAnimations();
        initForms();
        initPerformanceOptimizations();
        initAccessibility();
        
        console.log('🌶️ Samriddhi Udyog Masala website loaded successfully!');
        console.log('From an Assam Village to Your Kitchen 🏡➡️🍳');
    }

    // Initialize Lucide icons
    function initIcons() {
        try {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        } catch (error) {
            console.warn('Lucide icons failed to load:', error);
        }
    }

    // Mobile Navigation Toggle
    function initNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close menu when clicking on nav links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Global scroll to section function
    window.scrollToSection = function(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Initialize scroll effects
    function initScrollEffects() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;
        let ticking = false;

        function updateNavbar() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = 'none';
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        }

        function requestNavbarUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }

        if (!prefersReducedMotion) {
            window.addEventListener('scroll', requestNavbarUpdate);
        }

        // Update active navigation link
        updateActiveNavLink();
        window.addEventListener('scroll', updateActiveNavLink);
    }

    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Initialize animations
    function initAnimations() {
        if (prefersReducedMotion) return;

        // Parallax effect for hero background orbs (reduced on mobile)
        const orbs = document.querySelectorAll('.gradient-orb');
        let parallaxTicking = false;

        function updateParallax() {
            if (isMobile || isLowPowerDevice) return; // Skip parallax on mobile/low-power devices
            
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3; // Reduced speed for better performance
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * parallaxSpeed;
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            parallaxTicking = false;
        }

        function requestParallaxUpdate() {
            if (!parallaxTicking) {
                requestAnimationFrame(updateParallax);
                parallaxTicking = true;
            }
        }

        if (!isMobile && !isLowPowerDevice) {
            window.addEventListener('scroll', requestParallaxUpdate);
        }

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    
                    // Add staggered animation for grid items
                    if (entry.target.classList.contains('products-grid') || 
                        entry.target.classList.contains('features-grid')) {
                        const items = entry.target.children;
                        Array.from(items).forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('aos-animate');
                            }, index * (isMobile ? 50 : 100)); // Reduced delay on mobile
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe elements with animation attributes
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });

        // Observe grid containers
        document.querySelectorAll('.products-grid, .features-grid').forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize hover effects with mobile optimization
    function initHoverEffects() {
        // Product Card Hover Effects (disabled on touch devices)
        if (!('ontouchstart' in window)) {
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.01)';
                    this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(16, 185, 129, 0.15)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '';
                });
            });

            // Feature Card Hover Effects
            const featureCards = document.querySelectorAll('.feature-card');
            
            featureCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px) scale(1.01)';
                    this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '';
                });
            });

            // CTA Button Interactions
            const ctaButtons = document.querySelectorAll('.cta-button, .submit-button');
            
            ctaButtons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                    if (this.classList.contains('primary') || this.classList.contains('submit-button')) {
                        this.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
                    }
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '';
                });
            });
        }
    }

    // Initialize form handling
    function initForms() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Validation
                if (!data.name || !data.email || !data.message) {
                    showNotification('Please fill in all required fields.', 'error');
                    return;
                }
                
                if (!isValidEmail(data.email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }

                // Show loading state
                const submitButton = this.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;
                
                submitButton.classList.add('loading');
                submitButton.innerHTML = '<i data-lucide="loader" style="animation: spin 1s linear infinite;"></i> Sending...';
                submitButton.disabled = true;
                
                // Re-initialize icons for the loading spinner
                setTimeout(() => {
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 100);
                
                // Simulate form submission
                setTimeout(() => {
                    submitButton.classList.remove('loading');
                    submitButton.innerHTML = '<i data-lucide="check"></i> Message Sent!';
                    submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    
                    // Re-initialize icons
                    setTimeout(() => {
                        if (typeof lucide !== 'undefined') {
                            lucide.createIcons();
                        }
                    }, 100);
                    
                    showNotification('Thank you for your message! We\'ll get back to you soon at sambriddhiyudog@gmail.com', 'success');
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        this.reset();
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        submitButton.style.background = '';
                        
                        setTimeout(() => {
                            if (typeof lucide !== 'undefined') {
                                lucide.createIcons();
                            }
                        }, 100);
                    }, 3000);
                }, 2000);
            });
        }
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';
        notification.innerHTML = `
            <div class="notification-content">
                <i data-lucide="${iconName}"></i>
                <span>${message}</span>
                <button class="notification-close" aria-label="Close notification">×</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            left: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateY(-100px);
            transition: transform 0.3s ease;
            max-width: 400px;
            margin: 0 auto;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
        `;

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Re-initialize icons
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 100);
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
    }

    function hideNotification(notification) {
        notification.style.transform = 'translateY(-100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }

    // Initialize performance optimizations
    function initPerformanceOptimizations() {
        // Scroll Progress Indicator
        createScrollProgress();
        
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Recalculate positions if needed
                updateActiveNavLink();
            }, 250);
        });

        // Preload critical resources
        const criticalImages = [
            // Add any critical image URLs here
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Create scroll progress indicator
    function createScrollProgress() {
        if (isMobile) return; // Skip on mobile for performance
        
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #10b981, #fbbf24);
            z-index: 9999;
            transition: width 0.1s ease;
            transform: translateZ(0); /* Force hardware acceleration */
        `;
        document.body.appendChild(progressBar);
        
        let progressTicking = false;
        
        function updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = scrollPercent + '%';
            progressTicking = false;
        }

        function requestProgressUpdate() {
            if (!progressTicking) {
                requestAnimationFrame(updateProgress);
                progressTicking = true;
            }
        }
        
        if (!prefersReducedMotion) {
            window.addEventListener('scroll', requestProgressUpdate);
        }
    }

    // Initialize accessibility features
    function initAccessibility() {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-green);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content id
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.id = 'main-content';
            heroSection.setAttribute('tabindex', '-1');
        }

        // Keyboard navigation for mobile menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    hamburger.focus();
                }
            }
        });

        // High contrast mode detection
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.body.classList.add('high-contrast');
        }
    }

    // Utility functions
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

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Easter egg (reduced on mobile for performance)
    if (!isMobile && !isLowPowerDevice) {
        document.addEventListener('keydown', function(e) {
            const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
            
            if (!window.konamiIndex) window.konamiIndex = 0;
            
            if (e.keyCode === konamiCode[window.konamiIndex]) {
                window.konamiIndex++;
                if (window.konamiIndex === konamiCode.length) {
                    document.body.style.animation = 'rainbow 2s infinite';
                    showNotification('🎉 You found the secret! Thank you for exploring our website!', 'success');
                    
                    const rainbowStyle = document.createElement('style');
                    rainbowStyle.textContent = `
                        @keyframes rainbow {
                            0% { filter: hue-rotate(0deg); }
                            100% { filter: hue-rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(rainbowStyle);
                    
                    setTimeout(() => {
                        document.body.style.animation = '';
                        rainbowStyle.remove();
                    }, 5000);
                    
                    window.konamiIndex = 0;
                }
            } else {
                window.konamiIndex = 0;
            }
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Initialize hover effects after a short delay
    setTimeout(initHoverEffects, 500);

    // Error handling for failed resources
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
            console.warn('Resource failed to load:', e.target.src || e.target.href);
        }
    });

})();
=======
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
>>>>>>> f9ad403966582c6ddc483516285dea2097abaa69
