// Elite MasterMind Body Global Application - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 Initializing Elite MasterMind Body Global Experience...');
    
    // Initialize all luxury features
    initializeLuxuryNavigation();
    initializeTypewriterAnimation();
    initializeButtonAnimations();
    initializeFormHandling();
    initializeModalSystem();
    initializeScrollEffects();
    initializeLuxuryAnimations();
    initializeParticleSystem();
    
    console.log('✨ Elite transformation experience ready!');
});

// Luxury Navigation System
function initializeLuxuryNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle with elegant animation
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.addEventListener('click', function(e) {
        if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target.matches('.nav-link') ? e.target : e.target.closest('.nav-link');
            const href = target.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                smoothScrollToSection(targetId);
                
                // Close mobile menu after navigation
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        }
        
        // Handle footer navigation links
        if (e.target.matches('.footer-section a[href^="#"]')) {
            e.preventDefault();
            e.stopPropagation();
            const href = e.target.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                smoothScrollToSection(targetId);
            }
        }
    });
}

// Luxury Smooth Scrolling - Fixed
function smoothScrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    
    const header = document.querySelector('.luxury-header');
    const headerHeight = header ? header.offsetHeight : 80;
    const targetPosition = target.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    console.log(`🎯 Navigating to elite section: ${targetId}`);
}

// Typewriter Animation System - Fixed
function initializeTypewriterAnimation() {
    const typewriterElement = document.querySelector('.typewriter-text');
    if (!typewriterElement) return;
    
    const text = typewriterElement.dataset.text || "Transform Your Mind · Body · Life";
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '3px solid #FFD700';
    typewriterElement.style.width = 'auto';
    typewriterElement.style.whiteSpace = 'nowrap';
    typewriterElement.style.overflow = 'hidden';
    
    let index = 0;
    const speed = 100;
    
    function typeWriter() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            // Start blinking cursor after typing is complete
            setTimeout(() => {
                typewriterElement.style.animation = 'blink-cursor 1s step-end infinite';
            }, 1000);
            
            // Show other hero elements
            setTimeout(() => {
                const subtitle = document.querySelector('.hero-subtitle');
                const buttons = document.querySelector('.hero-buttons');
                if (subtitle) {
                    subtitle.style.opacity = '1';
                    subtitle.style.transform = 'translateY(0)';
                    subtitle.style.transition = 'all 0.8s ease';
                }
                if (buttons) {
                    buttons.style.opacity = '1';
                    buttons.style.transform = 'translateY(0)';
                    buttons.style.transition = 'all 0.8s ease 0.3s';
                }
            }, 500);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1500);
}

// Luxury Button Animation System - Fixed
function initializeButtonAnimations() {
    // Hero CTA buttons
    const bookBtn = document.getElementById('book-consultation-btn');
    const webinarBtn = document.getElementById('join-webinar-btn');
    
    if (bookBtn) {
        bookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            createButtonRipple(e);
            setTimeout(() => {
                smoothScrollToSection('consultation-form');
            }, 300);
        });
    }
    
    if (webinarBtn) {
        webinarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            createButtonRipple(e);
            setTimeout(() => {
                smoothScrollToSection('events');
            }, 300);
        });
    }
    
    // Service buttons
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            createButtonRipple(e);
            setTimeout(() => {
                smoothScrollToSection('consultation-form');
            }, 300);
        });
    });
    
    // Register buttons
    document.querySelectorAll('.register-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            createButtonRipple(e);
            setTimeout(() => {
                smoothScrollToSection('consultation-form');
            }, 300);
        });
    });
    
    // Add glow effect to buttons on hover
    document.querySelectorAll('.luxury-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.6)';
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
            this.style.transform = 'translateY(0)';
        });
    });
}

// Button Ripple Effect - Fixed
function createButtonRipple(e) {
    const button = e.target.closest('.luxury-btn');
    if (!button) return;
    
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            0% { transform: scale(0); opacity: 0.6; }
            100% { transform: scale(4); opacity: 0; }
        }
    `;
    if (!document.querySelector('#ripple-styles')) {
        style.id = 'ripple-styles';
        document.head.appendChild(style);
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Elite Form Handling System - Fixed
function initializeFormHandling() {
    const form = document.getElementById('consultationForm');
    if (!form) return;
    
    // Make sure form inputs work properly
    const inputs = form.querySelectorAll('.luxury-input, .luxury-textarea, .luxury-select');
    inputs.forEach(input => {
        // Remove any conflicting event listeners
        input.style.pointerEvents = 'auto';
        input.removeAttribute('disabled');
        
        input.addEventListener('focus', function(e) {
            e.stopPropagation();
            this.parentElement.classList.add('focused');
            const inputLine = this.parentElement.querySelector('.input-line');
            if (inputLine) {
                inputLine.style.width = '100%';
            }
        });
        
        input.addEventListener('blur', function(e) {
            e.stopPropagation();
            this.parentElement.classList.remove('focused');
            const inputLine = this.parentElement.querySelector('.input-line');
            if (inputLine) {
                inputLine.style.width = this.value ? '100%' : '0';
            }
        });
        
        input.addEventListener('input', function(e) {
            e.stopPropagation();
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
            clearEliteErrors();
        });
    });
    
    // Phone number formatting with Indian format
    const mobileInput = document.getElementById('mobile');
    if (mobileInput) {
        mobileInput.addEventListener('input', function(e) {
            e.stopPropagation();
            let value = e.target.value.replace(/\D/g, '');
            
            // Auto-add country code for Indian numbers
            if (value.length === 10 && !value.startsWith('91')) {
                value = '91' + value;
            }
            
            // Format with country code
            if (value.startsWith('91') && value.length > 2) {
                value = '+91 ' + value.substring(2);
            }
            
            e.target.value = value;
        });
    }
    
    // Elite form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        handleEliteFormSubmission();
    });
}

// Elite Form Submission Handler - Fixed
function handleEliteFormSubmission() {
    const formData = {
        name: getInputValue('name'),
        mobile: getInputValue('mobile'),
        email: getInputValue('email'),
        consultationType: getInputValue('consultation-type'),
        message: getInputValue('message')
    };
    
    console.log('Form data collected:', formData);
    
    // Elite validation
    const errors = validateEliteForm(formData);
    if (errors.length > 0) {
        displayEliteErrors(errors);
        return;
    }
    
    // Clear any existing errors
    clearEliteErrors();
    
    // Submit with luxury loading animation
    submitEliteForm(formData);
}

// Utility Functions - Fixed
function getInputValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : '';
}

function validateEliteForm(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 2) {
        errors.push('Please provide your distinguished name');
    }
    
    if (!data.mobile || data.mobile.replace(/\D/g, '').length < 10) {
        errors.push('Please enter a valid elite contact number');
    }
    
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Please provide your premium email address');
    }
    
    if (!data.consultationType) {
        errors.push('Please select your transformation path');
    }
    
    return errors;
}

function displayEliteErrors(errors) {
    clearEliteErrors();
    
    const form = document.getElementById('consultationForm');
    const errorContainer = document.createElement('div');
    errorContainer.className = 'elite-error-container';
    errorContainer.style.cssText = `
        background: linear-gradient(135deg, rgba(218, 165, 32, 0.1), rgba(255, 215, 0, 0.05));
        border: 1px solid rgba(218, 165, 32, 0.3);
        color: #FFD700;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 25px;
        animation: slideInFromTop 0.5s ease;
    `;
    
    const errorTitle = document.createElement('h4');
    errorTitle.style.cssText = `
        margin: 0 0 15px 0;
        color: #FFD700;
        font-size: 1.1rem;
    `;
    errorTitle.textContent = '⚠ Please Complete Required Fields';
    errorContainer.appendChild(errorTitle);
    
    const errorList = document.createElement('ul');
    errorList.style.cssText = `
        margin: 0;
        padding-left: 20px;
        list-style-type: none;
    `;
    
    errors.forEach(error => {
        const li = document.createElement('li');
        li.style.cssText = `
            margin-bottom: 8px;
            position: relative;
            padding-left: 20px;
        `;
        li.innerHTML = `<span style="position: absolute; left: 0; color: #FFD700;">✦</span>${error}`;
        errorList.appendChild(li);
    });
    
    errorContainer.appendChild(errorList);
    form.insertBefore(errorContainer, form.firstChild);
    
    // Smooth scroll to show errors
    setTimeout(() => smoothScrollToSection('consultation-form'), 300);
}

function clearEliteErrors() {
    const errors = document.querySelectorAll('.elite-error-container');
    errors.forEach(error => error.remove());
}

function submitEliteForm(formData) {
    const submitBtn = document.querySelector('#consultationForm button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    
    // Luxury loading animation
    submitBtn.innerHTML = `
        <span class="btn-text">
            <i class="fas fa-crown fa-spin" style="margin-right: 10px; animation: spin 1s linear infinite;"></i>
            Processing Elite Request...
        </span>
        <span class="btn-glow"></span>
    `;
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #DAA520, #B8860B)';
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    if (!document.querySelector('#spin-styles')) {
        style.id = 'spin-styles';
        document.head.appendChild(style);
    }
    
    // Simulate elite processing time
    setTimeout(() => {
        showEliteSuccessModal();
        
        // Reset form with style
        document.getElementById('consultationForm').reset();
        clearFormStyles();
        
        // Reset button
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        
        // Offer premium WhatsApp experience
        setTimeout(() => {
            if (confirm('🌟 Would you like to expedite your transformation journey via our elite WhatsApp channel?')) {
                const whatsappMessage = createEliteWhatsAppMessage(formData);
                window.open(whatsappMessage, '_blank');
            }
        }, 2500);
        
    }, 2000);
    
    console.log('🎯 Elite consultation request processed:', formData);
}

function clearFormStyles() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('focused', 'has-value');
        const inputLine = group.querySelector('.input-line');
        if (inputLine) {
            inputLine.style.width = '0';
        }
    });
}

function createEliteWhatsAppMessage(data) {
    const message = `🌟 ELITE TRANSFORMATION REQUEST 🌟

*Distinguished Name:* ${data.name}
*Elite Contact:* ${data.mobile}
*Premium Email:* ${data.email}
*Transformation Path:* ${data.consultationType}
${data.message ? `*Vision Statement:* ${data.message}` : ''}

I'm ready to unlock my extraordinary potential through your elite coaching programs. Please connect me with your transformation specialists.

Thank you for this exclusive opportunity! ✨`;
    
    return `https://wa.me/919811218842?text=${encodeURIComponent(message)}`;
}

// Elite Modal System - Fixed
function initializeModalSystem() {
    const modal = document.getElementById('success-modal');
    if (!modal) return;
    
    // Close button handlers
    const closeBtn = document.getElementById('modal-close-btn');
    const footerBtn = document.getElementById('modal-close-footer-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideEliteModal();
        });
    }
    
    if (footerBtn) {
        footerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideEliteModal();
        });
    }
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
            hideEliteModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            hideEliteModal();
        }
    });
}

function showEliteSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.5)';
            modalContent.style.opacity = '0';
            modalContent.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
            }, 100);
        }
    }
}

function hideEliteModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.8)';
            modalContent.style.opacity = '0';
        }
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Elite Scroll Effects - Fixed
function initializeScrollEffects() {
    const header = document.querySelector('.luxury-header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        // Luxury header effects
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.boxShadow = '0 5px 30px rgba(255, 215, 0, 0.2)';
            header.style.borderBottom = '1px solid rgba(255, 215, 0, 0.3)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = 'none';
            header.style.borderBottom = '1px solid rgba(255, 215, 0, 0.2)';
        }
        
        // Update active navigation
        updateActiveNavigation();
    });
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.luxury-header');
    const headerHeight = header ? header.offsetHeight : 80;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerHeight + 100 && rect.bottom >= headerHeight + 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
            link.style.color = '#FFD700';
        } else {
            link.style.color = '';
        }
    });
}

// Luxury Animations System - Fixed
function initializeLuxuryAnimations() {
    // Set initial hero states
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
    }
    
    // Intersection Observer for elegant reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealLuxuryElement(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe luxury elements
    const luxuryElements = document.querySelectorAll(
        '.luxury-coach-card, .luxury-service-card, .luxury-event-card, .contact-item, .luxury-contact-card'
    );
    
    luxuryElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(el);
    });
}

function revealLuxuryElement(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    // Add special glow effect for service cards
    if (element.classList.contains('luxury-service-card')) {
        setTimeout(() => {
            element.style.boxShadow = '0 10px 40px rgba(255, 215, 0, 0.2)';
        }, 600);
    }
}

// Enhanced Particle System - Fixed
function initializeParticleSystem() {
    const particles = document.querySelectorAll('.particle');
    
    // Create more dynamic particles
    particles.forEach((particle, index) => {
        const size = Math.random() * 4 + 2;
        const opacity = Math.random() * 0.8 + 0.2;
        const hue = Math.random() * 60 + 35; // Gold hue range
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `hsl(${hue}, 100%, 60%)`;
        particle.style.opacity = opacity;
        particle.style.boxShadow = `0 0 ${size * 2}px hsl(${hue}, 100%, 60%)`;
    });
}

// Elite Analytics and Tracking
function trackEliteInteraction(action, element) {
    console.log(`🌟 Elite Interaction: ${action} on ${element}`);
}

// Event listeners for analytics
document.addEventListener('click', function(e) {
    if (e.target.matches('.luxury-btn') || e.target.closest('.luxury-btn')) {
        const btn = e.target.matches('.luxury-btn') ? e.target : e.target.closest('.luxury-btn');
        trackEliteInteraction('button_click', btn.textContent.trim());
    }
    
    if (e.target.matches('.luxury-social-link') || e.target.closest('.luxury-social-link')) {
        const link = e.target.matches('.luxury-social-link') ? e.target : e.target.closest('.luxury-social-link');
        const platform = link.href.includes('instagram') ? 'instagram' :
                        link.href.includes('youtube') ? 'youtube' :
                        link.href.includes('whatsapp') ? 'whatsapp' : 'social';
        trackEliteInteraction('social_click', platform);
    }
});

// Global utility functions
window.smoothScrollToSection = smoothScrollToSection;
window.hideEliteModal = hideEliteModal;
window.trackEliteInteraction = trackEliteInteraction;

// Elite experience completion
window.addEventListener('load', function() {
    console.log('🚀 Elite MasterMind Body Global transformation experience fully loaded!');
    console.log('✨ Ready to transform extraordinary lives...');
});
