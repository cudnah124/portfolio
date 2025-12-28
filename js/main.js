// ============================================
// MAIN.JS - Portfolio Website Interactions
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 1. MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ============================================
    // 2. SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ============================================
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 3. ACTIVE SECTION HIGHLIGHTING IN NAVBAR
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-link');

    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                desktopNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // ============================================
    // 4. SCROLL PROGRESS BAR
    // ============================================
    const scrollProgress = document.getElementById('scroll-progress');

    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;

        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercentage}%`;
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // ============================================
    // 5. FADE-IN ON SCROLL ANIMATION (DISABLED)
    // ============================================
    // Animation disabled to prevent content from disappearing on page load
    // Content is now always visible for better user experience

    // ============================================
    // 6. NAVBAR BACKGROUND ON SCROLL
    // ============================================
    const navbar = document.getElementById('navbar');

    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbarBackground);

    // ============================================
    // 7. PROJECT CARDS STAGGER ANIMATION (DISABLED)
    // ============================================
    // Animation disabled to prevent cards from being hidden on page load

    // ============================================
    // 8. TYPING EFFECT FOR HERO SUBTITLE (Optional)
    // ============================================
    // Uncomment if you want a typing effect
    /*
    const subtitle = document.querySelector('#home p.text-xl');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    */

    // ============================================
    // 9. INITIALIZE ON LOAD
    // ============================================
    highlightActiveSection();
    updateScrollProgress();
    updateNavbarBackground();

    console.log('Portfolio website loaded successfully! 🚀');
});

// ============================================
// 10. PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(function () {
    // Scroll event handlers are already optimized above
}, 10));
