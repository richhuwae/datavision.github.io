// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks.style.display === 'flex') {
                        navLinks.style.display = 'none';
                    }
                }
            }
        });
    });

    // Mobile menu handling
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav-links');
        const header = document.querySelector('header');
        
        if (window.innerWidth <= 768) {
            // Create mobile menu button if it doesn't exist
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileBtn = document.createElement('button');
                mobileBtn.classList.add('mobile-menu-btn');
                mobileBtn.innerHTML = '☰';
                
                header.querySelector('.nav-container').insertBefore(
                    mobileBtn, 
                    document.querySelector('.cta-button')
                );
                
                mobileBtn.addEventListener('click', () => {
                    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                    
                    if (nav.style.display === 'flex') {
                        nav.style.position = 'absolute';
                        nav.style.top = '70px';
                        nav.style.left = '0';
                        nav.style.flexDirection = 'column';
                        nav.style.width = '100%';
                        nav.style.backgroundColor = 'white';
                        nav.style.padding = '20px';
                        nav.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
                        nav.style.zIndex = '100';
                    }
                });
            }
        } else {
            // Remove mobile menu button if screen is larger
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (mobileBtn) {
                mobileBtn.remove();
            }
            
            // Reset nav styles for larger screens
            nav.style.display = 'flex';
            nav.style.position = 'static';
            nav.style.flexDirection = 'row';
            nav.style.width = 'auto';
            nav.style.backgroundColor = 'transparent';
            nav.style.padding = '0';
            nav.style.boxShadow = 'none';
        }
    };

    // Run on load
    createMobileMenu();
    
    // Run on resize
    window.addEventListener('resize', createMobileMenu);
    
    // Form submission handling
    const form = document.querySelector('.form-container');
    const emailInput = document.querySelector('.email-input');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (form && emailInput && submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Simple validation
            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send this to your server
            // For demonstration, we'll just show a success message
            emailInput.value = '';
            alert('Thank you for subscribing to our newsletter!');
        });
    }
    
    // Simple email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Add scroll effect for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Animation on scroll for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        serviceCards.forEach(card => {
            // Initial state
            card.style.opacity = 0;
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            observer.observe(card);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        serviceCards.forEach(card => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        });
    }
});