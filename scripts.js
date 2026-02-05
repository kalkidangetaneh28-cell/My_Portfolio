// DOM Elements
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
const backToTopButton = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModalButton = document.getElementById('closeModal');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Typing Text Effect
const typingText = document.querySelector('.typing-text');
const professions = ['Web Developer', 'UI Designer', 'Frontend Specialist', 'Problem Solver'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        // Deleting text
        typingText.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        // Typing text
        typingText.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    // When word is complete
    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at end
    } 
    // When word is deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }
    
    // Animate skill bars on scroll
    animateSkillsOnScroll();
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Portfolio Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animate Skill Bars on Scroll
function animateSkillsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillProgressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = `${width}%`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Back to Top Button
window.addEventListener('scroll', () => {
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // In a real application, you would send this data to a server
    console.log('Contact Form Submitted:', { name, email, subject, message });
    
    // Show success modal
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    contactForm.reset();
});

// Close Modal
closeModalButton.addEventListener('click', () => {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-category, .project-card, .contact-card, .timeline-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    .skill-category, .project-card, .contact-card, .timeline-content {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Initial call
animateOnScroll();

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        console.log('Newsletter Subscription:', email);
        alert('Thank you for subscribing to my newsletter!');
        
        emailInput.value = '';
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add current year to footer
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});