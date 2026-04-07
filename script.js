// Edumax Static Copy Logic

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preloader-bar');
    const bodyContent = document.getElementById('body-content');
    
    if(bar) bar.style.width = '100%';
    
    setTimeout(() => {
        if(preloader) {
            preloader.style.opacity = '0';
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const navItems = document.querySelectorAll('.nav-item');

    // Handle Scroll Styling for Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled', 'shadow-lg');
            header.classList.remove('shadow-md');
        } else {
            header.classList.remove('scrolled', 'shadow-lg');
            header.classList.add('shadow-md');
        }
        
        // Highlight active section in navigation
        highlightActiveSection();
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (!isOpen) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            mobileMenu.classList.add('animate-in'); // Add animation class if desired
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });

    // Scroll to section function (global for onclick in HTML)
    window.scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');

            element.scrollIntoView({ behavior: 'smooth' });
            
            // Set active state on desktop nav
            navItems.forEach(item => {
                if (item.getAttribute('data-section') === sectionId) {
                    item.classList.add('text-blue-600', 'border-b-2', 'border-yellow-400');
                    item.classList.remove('text-gray-700');
                } else {
                    item.classList.remove('text-blue-600', 'border-b-2', 'border-yellow-400');
                    item.classList.add('text-gray-700');
                }
            });
        }
    };

    // Auto-highlighting sections during scroll
    function highlightActiveSection() {
        const sections = ['home', 'english', 'kids', 'assignments', 'contact'];
        let activeSec = 'home';
        
        const scrollPos = window.scrollY + 100; // Offset for better detection

        sections.forEach(s => {
            const el = document.getElementById(s);
            if (el && scrollPos >= el.offsetTop) {
                activeSec = s;
            }
        });

        navItems.forEach(item => {
            if (item.getAttribute('data-section') === activeSec) {
                item.classList.add('text-blue-600', 'border-b-2', 'border-yellow-400');
                item.classList.remove('text-gray-700');
            } else {
                item.classList.remove('text-blue-600', 'border-b-2', 'border-yellow-400');
                item.classList.add('text-gray-700');
            }
        });
    }

    // Initialize state
    highlightActiveSection();
});
