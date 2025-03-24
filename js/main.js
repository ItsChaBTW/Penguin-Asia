// Main JavaScript for Penguin Sales & Services Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navContent = document.getElementById('nav-content');
    
    if (navToggle && navContent) {
        navToggle.addEventListener('click', function() {
            navContent.classList.toggle('hidden');
            // Change icon based on state
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navContent.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });
    }
    
    // Mobile Services Dropdown
    const mobileServicesBtn = document.getElementById('mobile-services-btn');
    const mobileServicesMenu = document.getElementById('mobile-services-menu');
    
    if (mobileServicesBtn && mobileServicesMenu) {
        mobileServicesBtn.addEventListener('click', function() {
            mobileServicesMenu.classList.toggle('hidden');
            // Change icon based on state
            const icon = mobileServicesBtn.querySelector('i');
            if (icon) {
                if (mobileServicesMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            }
        });
    }
    
    // Search Overlay
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    
    if (searchToggle && searchOverlay && closeSearch) {
        searchToggle.addEventListener('click', function() {
            searchOverlay.classList.remove('hidden');
            searchOverlay.classList.add('fade-in');
            // Focus the search input
            const searchInput = searchOverlay.querySelector('input[type="text"]');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        });
        
        closeSearch.addEventListener('click', function() {
            searchOverlay.classList.add('fade-out');
            setTimeout(() => {
                searchOverlay.classList.add('hidden');
                searchOverlay.classList.remove('fade-out');
                searchOverlay.classList.remove('fade-in');
            }, 300);
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !searchOverlay.classList.contains('hidden')) {
                closeSearch.click();
            }
        });
        
        // Close on outside click
        searchOverlay.addEventListener('click', function(event) {
            if (event.target === searchOverlay) {
                closeSearch.click();
            }
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // FAQ Accordions
    const faqButtons = document.querySelectorAll('.faq-btn');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle content visibility
            content.classList.toggle('hidden');
            
            // Animate content height
            if (!content.classList.contains('hidden')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            } else {
                content.style.maxHeight = '0';
                if (icon) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
        });
    });
    
    // Add animation classes to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.classList.contains('hero-section')) {
            section.classList.add('fade-in');
        }
    });
    
    // Add animation classes to specific elements
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach(heading => {
        if (!heading.closest('.hero-section') && !heading.classList.contains('fade-in')) {
            heading.classList.add('fade-in');
        }
    });
    
    // Testimonial Carousel
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (testimonialsContainer) {
        const testimonials = testimonialsContainer.querySelectorAll('.testimonial');
        const dotsContainer = document.querySelector('.testimonial-dots');
        let currentIndex = 0;
        
        // Create dots if they don't exist
        if (testimonials.length > 1 && dotsContainer) {
            testimonials.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('testimonial-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        // Show a specific slide
        function goToSlide(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
                testimonial.style.opacity = i === index ? '1' : '0';
                
                // Update dots
                if (dotsContainer) {
                    const dots = dotsContainer.querySelectorAll('.testimonial-dot');
                    dots.forEach((dot, dotIndex) => {
                        dot.classList.toggle('active', dotIndex === index);
                    });
                }
            });
            currentIndex = index;
        }
        
        // Initialize the first slide
        goToSlide(0);
        
        // Auto advance slides
        if (testimonials.length > 1) {
            setInterval(() => {
                const nextIndex = (currentIndex + 1) % testimonials.length;
                goToSlide(nextIndex);
            }, 5000);
        }
    }
    
    // Page load animation
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
});

// Function to initialize carousels
function initializeCarousels() {
    const testimonialCarousels = document.querySelectorAll('.testimonial-carousel');
    
    testimonialCarousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        let currentIndex = 0;
        
        // Create dots if container exists
        if (dotsContainer && items.length > 1) {
            items.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        // Show initial slide
        showSlide(currentIndex);
        
        // Auto advance slides every 5 seconds if more than one
        if (items.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                showSlide(currentIndex);
            }, 5000);
        }
        
        function showSlide(index) {
            items.forEach((item, i) => {
                item.style.transform = `translateX(${100 * (i - index)}%)`;
                item.style.opacity = i === index ? '1' : '0';
                
                // Update dots if they exist
                if (dotsContainer) {
                    const dots = dotsContainer.querySelectorAll('.carousel-dot');
                    dots.forEach((dot, j) => {
                        dot.classList.toggle('active', j === index);
                    });
                }
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            showSlide(currentIndex);
        }
    });
}

// Function to animate navigation items
function animateNavItems() {
    const navItems = document.querySelectorAll('nav a, nav button');
    
    navItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${0.1 + (index * 0.07)}s`;
    });
}

// Search Functionality
const searchInput = document.querySelector('input[placeholder="Search..."]');
const searchButton = document.querySelector('.fa-search').parentElement;

if (searchInput && searchButton) {
    searchButton.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

function performSearch(query) {
    if (query.trim() === '') return;
    
    // Basic search implementation
    // In a real implementation, this would query a backend or search through page content
    alert('Searching for: ' + query);
    // For a more advanced implementation, you could redirect to a search results page
    // window.location.href = 'search-results.html?q=' + encodeURIComponent(query);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
}); 