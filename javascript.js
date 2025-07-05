// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'hidden md:hidden fixed inset-0 bg-white z-50 p-4';
    mobileMenu.innerHTML = `
        <div class="flex justify-end">
            <button type="button" class="text-gray-500 hover:text-gray-600 focus:outline-none">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="mt-8 space-y-6">
            <a href="/services" class="block text-gray-900 hover:text-secondary text-lg font-medium transition-colors">Services</a>
            <a href="/approach" class="block text-gray-900 hover:text-secondary text-lg font-medium transition-colors">Approach</a>
            <a href="/industries" class="block text-gray-900 hover:text-secondary text-lg font-medium transition-colors">Industries</a>
            <a href="/insights" class="block text-gray-900 hover:text-secondary text-lg font-medium transition-colors">Insights</a>
            <a href="/about" class="block text-gray-900 hover:text-secondary text-lg font-medium transition-colors">About Us</a>
            <a href="/contact" class="mt-8 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white btn-primary">
                Get Started
            </a>
        </div>
    `;
    
    mobileMenuButton.addEventListener('click', function() {
        document.body.appendChild(mobileMenu);
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenu.querySelector('button').addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
        setTimeout(() => document.body.removeChild(mobileMenu), 300);
    });
});

// GSAP Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Initialize GSAP animations
        gsap.registerEffect({
            name: "fadeIn",
            effect: (targets, config) => {
                return gsap.from(targets, {
                    opacity: 0,
                    duration: config.duration,
                    ease: "power2.out",
                    stagger: config.stagger
                });
            },
            defaults: {duration: 0.8, stagger: 0.1}
        });
        
        gsap.registerEffect({
            name: "slideUp",
            effect: (targets, config) => {
                return gsap.from(targets, {
                    opacity: 0,
                    y: 30,
                    duration: config.duration,
                    ease: "power2.out",
                    stagger: config.stagger
                });
            },
            defaults: {duration: 0.8, stagger: 0.1}
        });
        
        gsap.registerEffect({
            name: "scaleIn",
            effect: (targets, config) => {
                return gsap.from(targets, {
                    opacity: 0,
                    scale: 0.95,
                    duration: config.duration,
                    ease: "back.out(1.7)",
                    stagger: config.stagger
                });
            },
            defaults: {duration: 0.5, stagger: 0.1}
        });
        
        // Animate elements with GSAP
        gsap.effects.fadeIn(".gsap-fade-in", {stagger: 0.15});
        gsap.effects.slideUp(".gsap-slide-up");
        gsap.effects.scaleIn(".gsap-scale-in", {stagger: 0.1});
        
        // Animate hero section more prominently
        const heroTitle = document.querySelector('.hero-gradient h1');
        const heroText = document.querySelector('.hero-gradient p');
        const heroButtons = document.querySelectorAll('.hero-gradient a');
        
        if (heroTitle && heroText && heroButtons) {
            const tl = gsap.timeline();
            
            tl.from(heroTitle, {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: "power3.out"
            })
            .from(heroText, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.5")
            .from(heroButtons, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.4");
        }
        
        // Add scroll animations
        gsap.utils.toArray("section").forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power2.out"
            });
        });
        
        // Add hover animations to cards
        const cards = document.querySelectorAll('.card-hover');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    } else {
        // If reduced motion is preferred, just show all elements immediately
        gsap.set(".gsap-fade-in, .gsap-slide-up, .gsap-scale-in", {opacity: 1, y: 0, scale: 1});
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContent = document.getElementById('page-content');
    const pages = {
        'home': document.getElementById('home-page'),
        'services': document.getElementById('services-page'),
        'approach': document.getElementById('approach-page'),
        'industries': document.getElementById('industries-page'),
        'insights': document.getElementById('insights-page'),
        'about': document.getElementById('about-page'),
        'contact': document.getElementById('contact-page')
    };

    // Mobile menu functions
    function toggleMobileMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenuButton.innerHTML = '<span class="sr-only">Close main menu</span><i class="fas fa-times"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.innerHTML = '<span class="sr-only">Open main menu</span><i class="fas fa-bars"></i>';
        }
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.innerHTML = '<span class="sr-only">Open main menu</span><i class="fas fa-bars"></i>';
    }

    // Theme functions
    function setThemeIcon(isDark) {
        themeToggle.innerHTML = isDark 
            ? '<i class="fas fa-sun text-yellow-300"></i>'
            : '<i class="fas fa-moon text-gray-700"></i>';
    }

    function toggleDarkMode() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
        setThemeIcon(isDark);
    }

    function initializeTheme() {
        if (localStorage.getItem('color-theme')) {
            const savedTheme = localStorage.getItem('color-theme');
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
                setThemeIcon(true);
            } else {
                document.documentElement.classList.remove('dark');
                setThemeIcon(false);
            }
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            setThemeIcon(true);
        }
    }

    // Page navigation
    function showPage(targetPage) {
        // Hide all pages
        Object.values(pages).forEach(page => page.classList.add('hidden'));
        
        // Show target page
        if (pages[targetPage]) {
            pages[targetPage].classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Animate page content
            gsap.from(pages[targetPage], {
                duration: 0.5,
                opacity: 0,
                y: 20,
                ease: "power2.out"
            });
        }
    }

    // GSAP Animations
    function setupAnimations() {
        gsap.registerEffect({
            name: "fadeIn",
            defaults: {duration: 1},
            effect: (targets, config) => {
                return gsap.from(targets, {
                    opacity: 0,
                    duration: config.duration,
                    ease: "power2.out"
                });
            }
        });

        gsap.registerEffect({
            name: "slideUp",
            defaults: {duration: 0.8, y: 20},
            effect: (targets, config) => {
                return gsap.from(targets, {
                    opacity: 0,
                    y: config.y,
                    duration: config.duration,
                    ease: "power2.out"
                });
            }
        });

        gsap.registerEffect({
            name: "scaleIn",
            defaults: {duration: 0.5, scale: 0.95},
            effect: (targets, config) => {
                return gsap.from(targets, {
                    opacity: 0,
                    scale: config.scale,
                    duration: config.duration,
                    ease: "back.out(1.7)"
                });
            }
        });

        // Apply animations
        gsap.effects.fadeIn(".gsap-fade-in");
        gsap.effects.slideUp(".gsap-slide-up");
        gsap.effects.scaleIn(".gsap-scale-in");

        // Animate elements with delay classes
        const animateWithDelay = (selector, delay) => {
            document.querySelectorAll(selector).forEach(el => {
                gsap.from(el, {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    delay: delay,
                    ease: "power2.out"
                });
            });
        };

        animateWithDelay('.animate-delay-100', 0.1);
        animateWithDelay('.animate-delay-200', 0.2);
        animateWithDelay('.animate-delay-300', 0.3);

        // Animated pulse for outline-blue elements on hover
        document.querySelectorAll('.outline-blue').forEach(el => {
            el.addEventListener('mouseenter', () => el.classList.add('animate-pulse-blue'));
            el.addEventListener('mouseleave', () => el.classList.remove('animate-pulse-blue'));
        });
    }

    // Event Listeners
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenuLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    themeToggle.addEventListener('click', toggleDarkMode);
    mobileThemeToggle.addEventListener('click', function() {
        toggleDarkMode();
        closeMobileMenu();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(this.getAttribute('href').replace('/', ''));
        });
    });

    // Initialize
    initializeTheme();
    setupAnimations();
    showPage('home'); // Show home page by default
});