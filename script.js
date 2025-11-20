// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and skill categories
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add active class styles via JavaScript
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Typing effect for hero greeting (optional enhancement)
const heroGreeting = document.querySelector('.hero-greeting');
if (heroGreeting) {
    const originalText = heroGreeting.textContent;
    heroGreeting.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroGreeting.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax effect for hero background orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.1}px)`;
    });
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// LLM Text Generation Animation
const typingTexts = [
    'Generating...',
    'Processing...',
    'Understanding...',
    'Creating response...',
    'Analyzing context...'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeText() {
    if (!typingElement) return;
    
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        }
    } else {
        typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000); // Wait before deleting
            return;
        }
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeText, speed);
}

// Start typing animation when page loads
function startTypingAnimation() {
    const typingEl = document.querySelector('.typing-text');
    if (typingEl && !typingEl.dataset.started) {
        typingEl.dataset.started = 'true';
        // Reset animation state
        currentTextIndex = 0;
        currentCharIndex = 0;
        isDeleting = false;
        setTimeout(typeText, 500);
    }
}

// Try multiple times to ensure it starts
document.addEventListener('DOMContentLoaded', startTypingAnimation);

// Also try if already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTypingAnimation);
} else {
    startTypingAnimation();
}

// Fallback after a short delay
setTimeout(startTypingAnimation, 2000);

// Profile image loading and error handling
const profileImage = document.getElementById('profileImage');
if (profileImage) {
    // Check if image loads successfully
    profileImage.addEventListener('load', function() {
        console.log('Profile image loaded successfully');
        this.style.opacity = '1';
    });
    
    // Handle image load errors
    profileImage.addEventListener('error', function() {
        console.log('Profile image failed to load, showing fallback');
        this.style.display = 'none';
        const wrapper = this.closest('.profile-image-wrapper');
        if (wrapper) {
            const fallback = document.createElement('div');
            fallback.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%); border-radius: 50%; color: white; font-size: 4rem; font-weight: bold;';
            fallback.innerHTML = '<i class="fas fa-user"></i>';
            wrapper.appendChild(fallback);
        }
    });
    
    // Set initial opacity for fade-in effect
    profileImage.style.opacity = '0';
    profileImage.style.transition = 'opacity 0.5s ease';
}

// Debug: Log animation elements and force visibility
document.addEventListener('DOMContentLoaded', () => {
    console.log('LLM Animation element:', document.querySelector('.llm-animation'));
    console.log('RAG Animation element:', document.querySelector('.rag-animation'));
    console.log('Profile image element:', document.querySelector('.profile-image'));
    
    // Force visibility of neurons
    const neurons = document.querySelectorAll('.neuron');
    console.log('Found neurons:', neurons.length);
    neurons.forEach((neuron, index) => {
        neuron.style.display = 'block';
        neuron.style.visibility = 'visible';
        neuron.style.opacity = '1';
        console.log(`Neuron ${index} styles:`, window.getComputedStyle(neuron).display);
    });
    
    // Force visibility of doc chunks
    const docChunks = document.querySelectorAll('.doc-chunk');
    console.log('Found doc chunks:', docChunks.length);
    docChunks.forEach((chunk, index) => {
        chunk.style.display = 'block';
        chunk.style.visibility = 'visible';
        chunk.style.opacity = '1';
    });
    
    // Force visibility of vector nodes
    const vectorNodes = document.querySelectorAll('.vector-node');
    console.log('Found vector nodes:', vectorNodes.length);
    vectorNodes.forEach((node, index) => {
        node.style.display = 'block';
        node.style.visibility = 'visible';
        node.style.opacity = '1';
    });
});

// Console easter egg
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Praanav Bhowmik', 'color: #8b5cf6; font-size: 12px;');
