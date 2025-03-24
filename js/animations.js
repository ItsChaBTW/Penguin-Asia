/**
 * Animations.js - Handles animations for Penguin Sales & Services website
 * Includes scroll animations, hover effects, logo animations, and page transitions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Add a class to the body when the page is loaded
    document.body.classList.add('loaded');
    
    // Initialize all animations
    initScrollAnimations();
    initHoverAnimations();
    initLogoAnimation();
    initPageTransitions();
    
    // After a short delay, initialize staggered animations
    setTimeout(() => {
        initStaggeredAnimations();
        initFloatingAnimations();
    }, 500);
});

/**
 * Initialize scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .bounce-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

/**
 * Initialize hover animations for buttons and cards
 */
function initHoverAnimations() {
    // Button hover effects
    const buttons = document.querySelectorAll('.hover-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('animate-pulse');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('animate-pulse');
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.hover-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add a subtle shadow pulse
            card.style.transition = 'all 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s ease';
        });
    });
}

/**
 * Add animation to the logo
 */
function initLogoAnimation() {
    const logo = document.querySelector('header .logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.classList.add('animate-pulse');
        });
        logo.addEventListener('mouseleave', () => {
            logo.classList.remove('animate-pulse');
        });
    }
}

/**
 * Initialize page transitions
 */
function initPageTransitions() {
    // Add smooth transition between pages
    document.querySelectorAll('a').forEach(link => {
        // Skip links that are not to other pages or have special behavior
        if (link.getAttribute('href') && 
            link.getAttribute('href').indexOf('#') !== 0 && 
            !link.hasAttribute('target') &&
            link.hostname === window.location.hostname) {
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Fade out current page
                document.body.style.opacity = 0;
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        }
    });
}

/**
 * Apply staggered animations to child elements
 * @param {string} parentSelector - Selector for the parent element
 * @param {string} childrenSelector - Selector for the children to animate
 * @param {string} animationClass - CSS animation class to apply
 * @param {number} staggerDelay - Delay between each child animation in ms
 */
function applyStaggeredAnimation(parentSelector, childrenSelector, animationClass, staggerDelay = 100) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;
    
    const children = parent.querySelectorAll(childrenSelector);
    children.forEach((child, index) => {
        child.classList.add(animationClass);
        child.style.animationDelay = `${index * staggerDelay}ms`;
    });
}

/**
 * Initialize staggered animations for common elements
 */
function initStaggeredAnimations() {
    // Stagger service cards
    applyStaggeredAnimation('#services .grid', '.grid > div', 'fade-in-up', 100);
    
    // Stagger team members
    applyStaggeredAnimation('.team-section .grid', '.grid > div', 'fade-in-up', 150);
    
    // Stagger FAQ items
    applyStaggeredAnimation('.faq-section .space-y-4', '.faq-section .space-y-4 > div', 'fade-in', 100);
}

/**
 * Apply floating animation to elements
 * @param {string} selector - CSS selector for elements to animate
 */
function applyFloatingAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(el => {
        // Create random subtle floating effect
        const duration = 3 + Math.random() * 2; // 3-5 seconds
        const xMovement = 5 + Math.random() * 5; // 5-10px
        const yMovement = 5 + Math.random() * 5; // 5-10px
        
        el.style.animation = `floating ${duration}s ease-in-out infinite`;
        el.style.position = 'relative';
        
        // Add keyframes for this specific element
        const keyframes = `
            @keyframes floating {
                0% { transform: translate(0, 0); }
                50% { transform: translate(${xMovement}px, ${-yMovement}px); }
                100% { transform: translate(0, 0); }
            }
        `;
        
        // Add style element with keyframes
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
    });
}

/**
 * Initialize floating animations for decorative elements
 */
function initFloatingAnimations() {
    // Apply floating animations to decorative elements
    applyFloatingAnimation('.decorative-element');
    
    // Also apply to certain icons for subtle movement
    applyFloatingAnimation('.features-section .icon');
} 