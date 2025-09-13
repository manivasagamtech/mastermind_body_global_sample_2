// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const consultationForm = document.getElementById('consultationForm');
    const successModal = document.getElementById('success-modal');
    const header = document.querySelector('.header');
    
    // Initialize all functionality
    initializeNavigation();
    initializeFormHandling();
    initializeScrollEffects();
    initializeAnimations();
    initializeModalHandlers();
    
    console.log('MasterMind Body Global website initialized successfully');
});

// Initialize Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Navigation Links - Handle all nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                scrollToSection(targetId);
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // Hero CTA Buttons
    const bookConsultationBtn = document.getElementById('book-consultation-btn');
    const joinWebinarBtn = document.getElementById('join-webinar-btn');
    
    if (bookConsultationBtn) {
        bookConsultationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            scrollToSection('consultation-form');
        });
    }
    
    if (joinWebinarBtn) {
        joinWebinarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            scrollToSection('events');
        });
    }

    // Service Learn More buttons
    const serviceBtns = document.querySelectorAll('.service__btn');
    serviceBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            scrollToSection('consultation-form');
        });
    });

    // Event Register buttons
    const registerBtns = document.querySelectorAll('.register-btn');
    registerBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            scrollToSection('consultation-form');
        });
    });
    
    // Footer links
    const footerLinks = document.querySelectorAll('.footer__section a[href^="#"]');
    footerLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
}

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.querySelector('.header');
    
    if (section) {
        const headerHeight = header ? header.offsetHeight : 80;
        const sectionTop = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Initialize Form Handling
function initializeFormHandling() {
    const consultationForm = document.getElementById('consultationForm');
    if (!consultationForm) return;

    // Form submission handler
    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            mobile: document.getElementById('mobile').value.trim(),
            email: document.getElementById('email').value.trim(),
            consultationType: document.getElementById('consultation-type').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            showFormErrors(errors);
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(function() {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            consultationForm.reset();
            
            // Restore button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Create WhatsApp message
            const whatsappMessage = createWhatsAppMessage(formData);
            
            // Optional: Auto-open WhatsApp after a delay
            setTimeout(function() {
                if (confirm('Would you like to also send this information via WhatsApp for faster response?')) {
                    window.open(whatsappMessage, '_blank');
                }
            }, 2000);
            
        }, 1500);
    });

    // Auto-format phone number input
    const mobileInput = document.getElementById('mobile');
    if (mobileInput) {
        mobileInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Add +91 prefix for Indian numbers if not present
            if (value.length === 10 && !value.startsWith('91')) {
                value = '91' + value;
            }
            
            // Format the number
            if (value.startsWith('91') && value.length > 2) {
                value = '+91 ' + value.substring(2);
            }
            
            e.target.value = value;
        });
    }

    // Email validation feedback
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function(e) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (e.target.value && !emailRegex.test(e.target.value)) {
                e.target.style.borderColor = '#ff6b6b';
            } else {
                e.target.style.borderColor = '';
            }
        });
        
        emailInput.addEventListener('focus', function(e) {
            e.target.style.borderColor = '';
        });
    }
    
    // Clear errors when user starts typing
    const formInputs = consultationForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            clearFormErrors();
        });
    });
}

// Form Validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }
    
    const mobileRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    if (!formData.mobile || !mobileRegex.test(formData.mobile.replace(/\s/g, ''))) {
        errors.push('Please enter a valid mobile number');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.consultationType) {
        errors.push('Please select a consultation type');
    }
    
    return errors;
}

// Show Form Errors
function showFormErrors(errors) {
    clearFormErrors();
    
    if (errors.length > 0) {
        const consultationForm = document.getElementById('consultationForm');
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form__error';
        errorContainer.style.cssText = `
            background: #fee2e2;
            border: 1px solid #fca5a5;
            color: #dc2626;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
        `;
        
        const errorList = document.createElement('ul');
        errorList.style.cssText = 'margin: 0; padding-left: 20px;';
        
        errors.forEach(function(error) {
            const errorItem = document.createElement('li');
            errorItem.textContent = error;
            errorList.appendChild(errorItem);
        });
        
        errorContainer.appendChild(errorList);
        consultationForm.insertBefore(errorContainer, consultationForm.firstChild);
        
        scrollToSection('consultation-form');
    }
}

// Clear Form Errors
function clearFormErrors() {
    const existingErrors = document.querySelectorAll('.form__error');
    existingErrors.forEach(function(error) {
        error.remove();
    });
}

// Show Success Message
function showSuccessMessage() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Close Modal
function closeModal() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Initialize Modal Handlers
function initializeModalHandlers() {
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCloseFooterBtn = document.getElementById('modal-close-footer-btn');
    
    if (successModal) {
        // Close modal when clicking outside
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeModal();
            }
        });
        
        // Close modal with close button
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal();
            });
        }
        
        // Close modal with footer button
        if (modalCloseFooterBtn) {
            modalCloseFooterBtn.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal();
            });
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
}

// Create WhatsApp Message
function createWhatsAppMessage(formData) {
    const message = `Hello! I'd like to book a consultation.

*Name:* ${formData.name}
*Mobile:* ${formData.mobile}
*Email:* ${formData.email}
*Consultation Type:* ${formData.consultationType}
${formData.message ? `*Message:* ${formData.message}` : ''}

Please let me know the next available slot. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/919811218842?text=${encodedMessage}`;
}

// Initialize Scroll Effects
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header scroll effect
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 80;
    
    let current = '';
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initialize Animations
function initializeAnimations() {
    // Animate elements on scroll
    const elements = document.querySelectorAll('.service__card, .coach__card, .event__card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(function(element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        elements.forEach(function(element) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    // Hero content animation
    setTimeout(function() {
        animateHeroContent();
    }, 500);
}

// Hero Content Animation
function animateHeroContent() {
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroButtons = document.querySelector('.hero__buttons');
    const heroImage = document.querySelector('.hero__image');
    
    const elements = [
        { el: heroTitle, delay: 200 },
        { el: heroSubtitle, delay: 400 },
        { el: heroButtons, delay: 600 },
        { el: heroImage, delay: 800 }
    ];
    
    elements.forEach(function(item) {
        if (item.el) {
            item.el.style.opacity = '0';
            item.el.style.transform = item.el === heroImage ? 'scale(0.8)' : 'translateY(30px)';
            
            setTimeout(function() {
                item.el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                item.el.style.opacity = '1';
                item.el.style.transform = item.el === heroImage ? 'scale(1)' : 'translateY(0)';
            }, item.delay);
        }
    });
}

// Global functions for external access
window.scrollToSection = scrollToSection;
window.closeModal = closeModal;

// Track interactions for analytics (placeholder)
function trackInteraction(action, element) {
    console.log(`User interaction: ${action} on ${element}`);
    // In production, send to analytics service
}

// Handle special link tracking
document.addEventListener('click', function(e) {
    // Track button clicks
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
        const btn = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
        const buttonText = btn.textContent.trim();
        trackInteraction('button_click', buttonText);
    }
    
    // Track social media clicks
    if (e.target.matches('.social__link') || e.target.closest('.social__link')) {
        const link = e.target.matches('.social__link') ? e.target : e.target.closest('.social__link');
        const href = link.getAttribute('href');
        const platform = href.includes('instagram') ? 'instagram' : 
                        href.includes('youtube') ? 'youtube' : 
                        href.includes('whatsapp') ? 'whatsapp' : 'social';
        trackInteraction('social_click', platform);
    }
    
    // Track phone clicks
    if (e.target.matches('a[href^="tel:"]')) {
        trackInteraction('phone_click', e.target.href);
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    console.log('Connection restored');
});

window.addEventListener('offline', function() {
    console.log('Connection lost');
});

// Final initialization on window load
window.addEventListener('load', function() {
    console.log('MasterMind Body Global website fully loaded');
    
    // Check URL parameters for specific actions
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    if (action === 'book') {
        setTimeout(function() {
            scrollToSection('consultation-form');
        }, 1000);
    } else if (action === 'events') {
        setTimeout(function() {
            scrollToSection('events');
        }, 1000);
    }
});
