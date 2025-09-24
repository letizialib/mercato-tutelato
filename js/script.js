// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }
    
    setupScrollEffect() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove background on scroll
            if (scrollTop > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    setupMobileMenu() {
        if (!this.navToggle || !this.navMenu) return;

        this.navToggle.addEventListener('click', () => {
            const expanded = this.navToggle.getAttribute('aria-expanded') === 'true';
            this.navToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            // Update aria-expanded for accessibility
            this.navToggle.setAttribute('aria-expanded', String(!expanded));
        });
        
        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navToggle.classList.remove('active');
                this.navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.navToggle.classList.remove('active');
                this.navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                this.navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        const offsetTop = target.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// Hero animations
class HeroAnimations {
    constructor() {
        this.heroCards = document.querySelectorAll('.floating-card');
        this.heroMainImage = document.querySelector('.hero-main-image');
        
        this.init();
    }
    
    init() {
        this.setupFloatingAnimation();
        this.setupParallaxEffect();
        this.setupMouseFollowEffect();
    }
    
    setupFloatingAnimation() {
        this.heroCards.forEach((card, index) => {
            // Stagger the animation delays
            card.style.animationDelay = `${index * 0.5}s`;
            
            // Add random movement
            setInterval(() => {
                const randomX = (Math.random() - 0.5) * 10;
                const randomY = (Math.random() - 0.5) * 10;
                
                card.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 500);
        });
    }
    
    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (this.heroMainImage) {
                this.heroMainImage.style.transform = `translateY(${parallax}px)`;
            }
            
            this.heroCards.forEach((card, index) => {
                const speed = 0.2 + index * 0.1;
                card.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    setupMouseFollowEffect() {
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const { clientX: x, clientY: y } = e;
                const { left, top, width, height } = hero.getBoundingClientRect();
                
                const centerX = left + width / 2;
                const centerY = top + height / 2;
                
                const deltaX = (x - centerX) / width;
                const deltaY = (y - centerY) / height;
                
                this.heroCards.forEach((card, index) => {
                    const intensity = (index + 1) * 10;
                    const rotateX = deltaY * intensity;
                    const rotateY = deltaX * intensity;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });
            });
            
            hero.addEventListener('mouseleave', () => {
                this.heroCards.forEach(card => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                });
            });
        }
    }
}

// Stats counter animation
class StatsCounter {
    constructor() {
        this.statsNumbers = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    animateCounters() {
        this.statsNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
}

// Service cards animations
class ServiceCards {
    constructor() {
        this.serviceCards = document.querySelectorAll('.service-card');
        
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
        this.setupStaggeredAnimation();
    }
    
    setupHoverEffects() {
        this.serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add glow effect
                card.style.boxShadow = '0 20px 40px rgba(30, 64, 175, 0.15)';
                
                // Animate icon
                const icon = card.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '';
                
                const icon = card.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    setupStaggeredAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        this.serviceCards.forEach(card => {
            card.style.transform = 'translateY(50px)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
    }
}

// Form handling
class FormHandler {
    constructor() {
        // Try to find the main form (page) first, otherwise fallback to modal form
        this.contactForm = document.getElementById('mainContactForm') || document.getElementById('contactForm');
        this.formInputs = this.contactForm ? this.contactForm.querySelectorAll('input, select') : document.querySelectorAll('.contact-form input, .contact-form select');
        
        this.init();
    }
    
    init() {
        this.setupFormValidation();
        this.setupInputAnimations();
        this.setupFormSubmission();
    }
    
    setupFormValidation() {
        this.formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearErrorState(input);
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing error states
        this.clearErrorState(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'Questo campo è obbligatorio');
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Inserisci un email valida');
                isValid = false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(value)) {
                this.showError(field, 'Inserisci un numero di telefono valido');
                isValid = false;
            }
        }
        
        // CAP validation
        if (field.name === 'cap' && value) {
            const capRegex = /^[0-9]{5}$/;
            if (!capRegex.test(value)) {
                this.showError(field, 'Inserisci un CAP valido (5 cifre)');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    showError(field, message) {
        field.style.borderColor = '#ef4444';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    clearErrorState(field) {
        field.style.borderColor = '';
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    setupInputAnimations() {
        this.formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.transform = 'scale(1.02)';
                input.style.boxShadow = '0 0 0 3px rgba(30, 64, 175, 0.1)';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = 'scale(1)';
                input.style.boxShadow = '';
            });
        });
    }
    
    setupFormSubmission() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Validate all fields
                let isFormValid = true;
                this.formInputs.forEach(input => {
                    if (!this.validateField(input)) {
                        isFormValid = false;
                    }
                });
                
                // Check privacy checkbox within the current form (name=privacy)
                const privacyCheckbox = this.contactForm.querySelector('input[type="checkbox"][name="privacy"]');
                if (privacyCheckbox && !privacyCheckbox.checked) {
                    this.showError(privacyCheckbox, 'Devi accettare la privacy policy');
                    isFormValid = false;
                }
                
                if (isFormValid) {
                    this.submitForm();
                } else {
                    // Scroll to first error
                    const firstError = document.querySelector('.error-message');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        }
    }
    
    async submitForm() {
        if (!this.contactForm) return;
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showSuccessMessage();
            this.contactForm.reset();
            
        } catch (error) {
            this.showErrorMessage('Si è verificato un errore. Riprova più tardi.');
        } finally {
            // Restore button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.style.cssText = `
            background: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            text-align: center;
            font-weight: 600;
        `;
        message.innerHTML = '<i class="fas fa-check-circle"></i> Richiesta inviata con successo! Ti contatteremo presto.';
        
        this.contactForm.insertBefore(message, this.contactForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    showErrorMessage(text) {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.style.cssText = `
            background: #ef4444;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            text-align: center;
            font-weight: 600;
        `;
        message.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${text}`;
        
        this.contactForm.insertBefore(message, this.contactForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

// Back to top button
class BackToTop {
    constructor() {
        this.backToTopButton = document.getElementById('backToTop');
        
        this.init();
    }
    
    init() {
        this.setupScrollListener();
        this.setupClickHandler();
    }
    
    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.backToTopButton.classList.add('visible');
            } else {
                this.backToTopButton.classList.remove('visible');
            }
        });
    }
    
    setupClickHandler() {
        this.backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Newsletter form
class Newsletter {
    constructor() {
        this.newsletterForm = document.querySelector('.newsletter-form');
        
        this.init();
    }
    
    init() {
        if (this.newsletterForm) {
            this.newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitNewsletter();
            });
        }
    }
    
    async submitNewsletter() {
        const input = this.newsletterForm.querySelector('input[type="email"]');
        const button = this.newsletterForm.querySelector('button');
        const email = input.value.trim();
        
        if (!email) {
            this.showNewsletterMessage('Inserisci il tuo indirizzo email', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNewsletterMessage('Inserisci un indirizzo email valido', 'error');
            return;
        }
        
        // Show loading
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        try {
            // Simulate submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.showNewsletterMessage('Iscrizione completata con successo!', 'success');
            input.value = '';
            
        } catch (error) {
            this.showNewsletterMessage('Errore durante l\'iscrizione', 'error');
        } finally {
            button.innerHTML = '<i class="fas fa-paper-plane"></i>';
            button.disabled = false;
        }
    }
    
    showNewsletterMessage(text, type) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            right: 0;
            padding: 0.5rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            font-weight: 600;
            text-align: center;
            z-index: 10;
            ${type === 'success' ? 'background: #10b981; color: white;' : 'background: #ef4444; color: white;'}
        `;
        message.textContent = text;
        
        this.newsletterForm.style.position = 'relative';
        this.newsletterForm.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}

// Lazy loading for images
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        
        this.init();
    }
    
    init() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        this.images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Optimize scroll performance
        this.optimizeScrollEvents();
        
        // Reduce DOM queries
        this.cacheDOM();
    }
    
    preloadCriticalResources() {
        const criticalFonts = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
        ];
        
        criticalFonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
    
    optimizeScrollEvents() {
        let ticking = false;
        
        const updateScroll = () => {
            // Batch scroll-related updates
            ticking = false;
        };
        
        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }
    
    cacheDOM() {
        // Cache frequently accessed DOM elements
        this.cachedElements = {
            navbar: document.querySelector('.navbar'),
            hero: document.querySelector('.hero'),
            backToTop: document.querySelector('.back-to-top'),
            navMenu: document.querySelector('.nav-menu')
        };
    }
}

// FAQ Functionality - Simplified version
class FAQManager {
    constructor() {
        console.log('🔧 FAQManager initialized');
        document.body.setAttribute('data-js-loaded', 'true');
        this.setupFAQs();
        this.setupSearch();
        this.setupCategories();
    }

    setupFAQs() {
        console.log('🔧 Setting up FAQ functionality...');
        const faqItems = document.querySelectorAll('.faq-item');
        console.log(`🔧 Found ${faqItems.length} FAQ items`);
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            if (question) {
                console.log(`🔧 Adding event to FAQ ${index + 1}`);
                
                // Remove any existing event listeners and add new one
                const newQuestion = question.cloneNode(true);
                question.parentNode.replaceChild(newQuestion, question);
                
                newQuestion.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log(`🔧 FAQ ${index + 1} clicked!`);
                    
                    // Close all other FAQs
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            console.log('🔧 Closed other FAQ');
                        }
                    });
                    
                    // Toggle current FAQ
                    const wasActive = item.classList.contains('active');
                    item.classList.toggle('active');
                    console.log(`🔧 FAQ ${index + 1} is now: ${item.classList.contains('active') ? 'OPEN' : 'CLOSED'}`);
                    
                    // Force style update
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        if (item.classList.contains('active')) {
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                            console.log(`🔧 Set max-height to ${answer.scrollHeight}px`);
                        } else {
                            answer.style.maxHeight = '0px';
                            console.log('🔧 Set max-height to 0px');
                        }
                    }
                });
            } else {
                console.log(`❌ No question button found for FAQ ${index + 1}`);
            }
        });
        
        document.body.setAttribute('data-faq-events-added', faqItems.length);
        console.log('✅ FAQ setup completed');
    }

    setupSearch() {
        const searchInput = document.getElementById('faqSearchInput');
        const clearBtn = document.getElementById('clearSearch');
        const suggestionTags = document.querySelectorAll('.suggestion-tag');

        console.log(`🔧 Search elements: input=${!!searchInput}, clear=${!!clearBtn}, suggestions=${suggestionTags.length}`);

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                console.log('🔧 Search:', e.target.value);
                this.filterFAQs(e.target.value);
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                console.log('🔧 Clear search clicked');
                if (searchInput) {
                    searchInput.value = '';
                    this.filterFAQs('');
                }
            });
        }

        suggestionTags.forEach((tag, index) => {
            tag.addEventListener('click', () => {
                const searchTerm = tag.dataset.search;
                console.log(`🔧 Suggestion ${index + 1} clicked:`, searchTerm);
                if (searchInput) {
                    searchInput.value = searchTerm;
                    this.filterFAQs(searchTerm);
                }
            });
        });
    }

    setupCategories() {
        const categoryCards = document.querySelectorAll('.category-card');
        console.log(`🔧 Found ${categoryCards.length} category cards`);
        
        categoryCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                console.log(`🔧 Category ${index + 1} clicked:`, category);
                
                // Update active category
                categoryCards.forEach(otherCard => {
                    otherCard.classList.remove('active');
                });
                card.classList.add('active');
                
                // Filter FAQs by category
                this.filterByCategory(category);
            });
        });
    }

    filterFAQs(searchTerm) {
        console.log('🔍 Filtering FAQs with term:', searchTerm);
        const faqItems = document.querySelectorAll('.faq-item');
        const faqGroups = document.querySelectorAll('.faq-group');
        const noResults = document.getElementById('noResults');
        let hasVisibleItems = false;

        faqItems.forEach((item, index) => {
            const questionElement = item.querySelector('.faq-question span');
            const answerElement = item.querySelector('.faq-answer');
            
            if (questionElement && answerElement) {
                const question = questionElement.textContent.toLowerCase();
                const answer = answerElement.textContent.toLowerCase();
                const matches = !searchTerm || 
                              question.includes(searchTerm.toLowerCase()) || 
                              answer.includes(searchTerm.toLowerCase());
                
                item.style.display = matches ? 'block' : 'none';
                if (matches) hasVisibleItems = true;
                
                console.log(`🔍 FAQ ${index + 1}: ${matches ? 'VISIBLE' : 'HIDDEN'}`);
            }
        });

        // Show/hide groups
        faqGroups.forEach(group => {
            const visibleItems = Array.from(group.querySelectorAll('.faq-item')).filter(item => 
                item.style.display !== 'none'
            );
            group.style.display = visibleItems.length > 0 ? 'block' : 'none';
        });

        // Show/hide no results message
        if (noResults) {
            noResults.style.display = hasVisibleItems ? 'none' : 'block';
        }
        
        console.log('🔍 Search completed, visible items:', hasVisibleItems);
    }

    filterByCategory(category) {
        console.log('📂 Filtering by category:', category);
        const faqGroups = document.querySelectorAll('.faq-group');
        const noResults = document.getElementById('noResults');
        let hasVisibleGroups = false;

        faqGroups.forEach((group, index) => {
            const groupCategory = group.dataset.category;
            const shouldShow = category === 'all' || groupCategory === category;
            group.style.display = shouldShow ? 'block' : 'none';
            if (shouldShow) hasVisibleGroups = true;
            console.log(`📂 Group ${index + 1} (${groupCategory}): ${shouldShow ? 'VISIBLE' : 'HIDDEN'}`);
        });

        // Clear search
        const searchInput = document.getElementById('faqSearchInput');
        if (searchInput) {
            searchInput.value = '';
        }

        // Reset FAQ item visibility
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.style.display = 'block';
        });

        // Show/hide no results
        if (noResults) {
            noResults.style.display = hasVisibleGroups ? 'none' : 'block';
        }
        
        console.log('📂 Category filter completed, visible groups:', hasVisibleGroups);
    }
}

// Comparison Form Functionality
class ComparisonForm {
    constructor() {
        this.initRangeSlider();
        this.initForm();
    }

    initRangeSlider() {
        const consumoRange = document.getElementById('consumo');
        const consumoValue = document.getElementById('consumoValue');

        if (consumoRange && consumoValue) {
            consumoRange.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                consumoValue.textContent = `${value.toLocaleString()} kWh`;
                
                // Update guide highlighting
                this.updateConsumptionGuide(value);
            });
        }
    }

    updateConsumptionGuide(value) {
        const guideItems = document.querySelectorAll('.guide-item');
        
        guideItems.forEach(item => {
            item.style.backgroundColor = '#f8fafc';
            item.style.borderLeft = 'none';
        });

        let activeItem = null;
        if (value <= 2000) {
            activeItem = guideItems[0];
        } else if (value <= 3500) {
            activeItem = guideItems[1];
        } else {
            activeItem = guideItems[2];
        }

        if (activeItem) {
            activeItem.style.backgroundColor = '#dbeafe';
            activeItem.style.borderLeft = '4px solid var(--primary-color)';
        }
    }

    initForm() {
        const form = document.getElementById('comparisonForm');
        const resetBtn = document.getElementById('resetFilters');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetForm();
            });
        }
    }

    handleFormSubmit() {
        // Get form data
        const formData = new FormData(document.getElementById('comparisonForm'));
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // Simulate search loading
        const submitBtn = document.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ricerca in corso...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll to results
            const resultsSection = document.querySelector('.offers-section');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 2000);
    }

    resetForm() {
        const form = document.getElementById('comparisonForm');
        if (form) {
            form.reset();
            
            // Reset range slider display
            const consumoValue = document.getElementById('consumoValue');
            if (consumoValue) {
                consumoValue.textContent = '2.700 kWh';
            }
            
            // Reset guide highlighting
            this.updateConsumptionGuide(2700);
        }
    }
}

// Offer Cards Functionality
class OfferCards {
    constructor() {
        this.initOfferCards();
        this.initLoadMore();
    }

    initOfferCards() {
        const offerCards = document.querySelectorAll('.offer-card');
        
        offerCards.forEach(card => {
            // Add hover effects and interactions
            const ctaButtons = card.querySelectorAll('.btn-primary');
            const detailButtons = card.querySelectorAll('.btn-outline');
            
            ctaButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleOfferSelection(card);
                });
            });
            
            detailButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showOfferDetails(card);
                });
            });
        });
    }

    initLoadMore() {
        const loadMoreBtn = document.querySelector('.load-more .btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreOffers();
            });
        }
    }

    handleOfferSelection(card) {
        const providerName = card.querySelector('.provider-details h3').textContent;
        const price = card.querySelector('.price-value').textContent;
        
        // Simulate offer selection
        const btn = card.querySelector('.btn-primary');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Elaborazione...';
        btn.disabled = true;
        
        setTimeout(() => {
            alert(`Hai selezionato l'offerta ${providerName} a ${price}/kWh. Verrai reindirizzato al processo di attivazione.`);
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }

    showOfferDetails(card) {
        const providerName = card.querySelector('.provider-details h3').textContent;
        alert(`Dettagli completi per l'offerta ${providerName} - Funzionalità in sviluppo`);
    }

    loadMoreOffers() {
        const loadMoreBtn = document.querySelector('.load-more .btn');
        const originalText = loadMoreBtn.innerHTML;
        
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Caricamento...';
        loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            loadMoreBtn.innerHTML = originalText;
            loadMoreBtn.disabled = false;
            alert('Nessuna nuova offerta disponibile al momento');
        }, 1500);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    console.log('Current page:', window.location.pathname);
    
    // Initialize all components
    new Navigation();
    new HeroAnimations();
    new StatsCounter();
    new ServiceCards();
    new FormHandler();
    new BackToTop();
    new Newsletter();
    new LazyLoader();
    new PerformanceOptimizer();
    
    // Initialize new FAQ and form functionality
    const isFAQPage = window.location.pathname.includes('faq.html') || document.querySelector('.faq-content');
    console.log('Is FAQ page:', isFAQPage);
    
    if (document.querySelector('.faq-item') || isFAQPage) {
        console.log('Initializing FAQManager because FAQ elements found or FAQ page detected');
        new FAQManager();
    } else {
        console.log('No FAQ elements found, skipping FAQManager');
        
        // Fallback: Try again after a short delay if we're on FAQ page
        if (isFAQPage) {
            console.log('FAQ page detected, trying again in 100ms...');
            setTimeout(() => {
                if (document.querySelector('.faq-item')) {
                    console.log('FAQ elements found on retry, initializing FAQManager');
                    new FAQManager();
                } else {
                    console.log('Still no FAQ elements found after retry');
                }
            }, 100);
        }
    }
    if (document.getElementById('comparisonForm')) {
        new ComparisonForm();
    }
    if (document.querySelector('.offer-card')) {
        new OfferCards();
    }
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
    
    // Console message for developers
    console.log('🚀 MercatoTutelato.it loaded successfully!');
    
    // Test FAQ functionality immediately if on FAQ page
    if (window.location.pathname.includes('faq.html') || document.querySelector('.faq-content')) {
        console.log('Testing FAQ functionality directly...');
        setTimeout(() => {
            const faqItems = document.querySelectorAll('.faq-item');
            console.log('FAQ items found for direct test:', faqItems.length);
            
            if (faqItems.length > 0 && !document.body.hasAttribute('data-faq-events-added')) {
                console.log('FAQ items found but no events added, forcing initialization...');
                new FAQManager();
            }
        }, 500);
    }
});

// Timeline Countdown Class
class TimelineCountdown {
    constructor() {
        this.targetDate = new Date('2027-03-31T23:59:59');
        this.countdownElement = document.getElementById('countdown');
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        
        if (this.countdownElement) {
            this.init();
        }
    }
    
    init() {
        this.updateCountdown();
        this.startTimer();
    }
    
    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetDate.getTime() - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            if (this.daysElement) this.daysElement.textContent = days.toString().padStart(3, '0');
            if (this.hoursElement) this.hoursElement.textContent = hours.toString().padStart(2, '0');
            if (this.minutesElement) this.minutesElement.textContent = minutes.toString().padStart(2, '0');
            
            // Add urgency classes based on time remaining
            if (days < 365) {
                this.countdownElement.classList.add('urgent');
            }
            if (days < 180) {
                this.countdownElement.classList.add('critical');
            }
        } else {
            // Time expired
            if (this.daysElement) this.daysElement.textContent = '000';
            if (this.hoursElement) this.hoursElement.textContent = '00';
            if (this.minutesElement) this.minutesElement.textContent = '00';
            this.countdownElement.classList.add('expired');
        }
    }
    
    startTimer() {
        setInterval(() => {
            this.updateCountdown();
        }, 60000); // Update every minute
        
        // Update immediately
        this.updateCountdown();
    }
}

// Global filter function for FAQ search
function filterFAQs(searchTerm = '') {
    const faqManager = new FAQManager();
    faqManager.filterFAQs(searchTerm);
}

// Test function for FAQ functionality - Enhanced version
function testFAQFunctionality() {
    console.log('🧪 === TESTING FAQ FUNCTIONALITY ===');
    
    const faqItems = document.querySelectorAll('.faq-item');
    const categories = document.querySelectorAll('.category-card');
    const searchInput = document.getElementById('faqSearchInput');
    const suggestions = document.querySelectorAll('.suggestion-tag');
    
    console.log('🧪 FAQ items found:', faqItems.length);
    console.log('🧪 Category cards found:', categories.length);
    console.log('🧪 Search input found:', !!searchInput);
    console.log('🧪 Suggestion tags found:', suggestions.length);
    
    let testResults = [];
    
    // Test 1: Check if FAQ items exist
    testResults.push(`FAQ Items: ${faqItems.length}`);
    
    // Test 2: Check if first FAQ has proper structure
    if (faqItems.length > 0) {
        const firstFaq = faqItems[0];
        const question = firstFaq.querySelector('.faq-question');
        const answer = firstFaq.querySelector('.faq-answer');
        
        testResults.push(`First FAQ Question: ${!!question ? '✅' : '❌'}`);
        testResults.push(`First FAQ Answer: ${!!answer ? '✅' : '❌'}`);
        
        // Test 3: Try to click first FAQ
        if (question) {
            console.log('🧪 Simulating click on first FAQ...');
            question.click();
            
            setTimeout(() => {
                const isActive = firstFaq.classList.contains('active');
                testResults.push(`Click Response: ${isActive ? '✅ WORKS' : '❌ FAILED'}`);
                
                // Show alert with results
                alert(`🧪 TEST RISULTATI:\n\n${testResults.join('\n')}\n\nConsole: Apri DevTools (F12) per log dettagliati`);
            }, 200);
        } else {
            testResults.push(`Click Test: ❌ No question button`);
            alert(`🧪 TEST RISULTATI:\n\n${testResults.join('\n')}`);
        }
    } else {
        testResults.push(`Click Test: ❌ No FAQ items found`);
        alert(`🧪 TEST RISULTATI:\n\n${testResults.join('\n')}`);
    }
    
    console.log('🧪 === END FAQ TEST ===');
}

// Contact Form Modal Management
let currentAction = null;

function openContactModal(action) {
    currentAction = action;
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Reset form
        resetContactForm();
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentAction = null;
    }
}

function resetContactForm() {
    const form = document.getElementById('mainContactForm') || document.getElementById('contactForm');
    if (form) {
        form.reset();
        // Clear all error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.textContent = '');
    }
}

function validateField(fieldName, value) {
    const errors = {
        nome: '',
        cognome: '',
        telefono: '',
        email: '',
        privacy: ''
    };

    switch (fieldName) {
        case 'nome':
        case 'cognome':
            if (!value || value.trim().length < 2) {
                errors[fieldName] = 'Questo campo deve contenere almeno 2 caratteri';
            } else if (!/^[a-zA-ZÀ-ÿ\s']+$/.test(value.trim())) {
                errors[fieldName] = 'Questo campo può contenere solo lettere e spazi';
            }
            break;
            
        case 'telefono':
            if (!value || value.trim().length === 0) {
                errors.telefono = 'Il numero di telefono è obbligatorio';
            } else if (!/^[\+]?[0-9\s\-\(\)]{8,15}$/.test(value.trim())) {
                errors.telefono = 'Inserisci un numero di telefono valido';
            }
            break;
            
        case 'email':
            if (!value || value.trim().length === 0) {
                errors.email = 'L\'email è obbligatoria';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
                errors.email = 'Inserisci un indirizzo email valido';
            }
            break;
            
        case 'privacy':
            if (!value) {
                errors.privacy = 'Devi accettare l\'informativa sulla privacy per continuare';
            }
            break;
    }

    return errors[fieldName];
}

function showFieldError(fieldName, errorMessage) {
    const errorElement = document.getElementById(fieldName + 'Error');
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
}

function validateContactForm() {
    const form = document.getElementById('mainContactForm') || document.getElementById('contactForm');
    if (!form) return false;

    const formData = new FormData(form);
    let isValid = true;

    // Validate all fields
    const fields = ['nome', 'cognome', 'telefono', 'email'];
    fields.forEach(fieldName => {
        const value = formData.get(fieldName);
        const error = validateField(fieldName, value);
        showFieldError(fieldName, error);
        if (error) isValid = false;
    });

    // Validate privacy checkbox
    const privacyChecked = formData.get('privacy') === 'on' || formData.get('privacy') === 'true' || formData.get('privacy') === '1';
    const privacyError = validateField('privacy', privacyChecked);
    showFieldError('privacy', privacyError);
    if (privacyError) isValid = false;

    return isValid;
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    if (validateContactForm()) {
        // Form is valid, proceed with the action
        const form = document.getElementById('mainContactForm') || document.getElementById('contactForm');
        const formData = new FormData(form);
        
        // You can send the data to a server here
        console.log('Form data:', Object.fromEntries(formData));
        
        // Close modal
        closeContactModal();
        
        // Redirect to confronta offerte page for both actions
        window.location.href = 'offerte.html';
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactModal();
    }
});

// Add real-time validation to form fields
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mainContactForm') || document.getElementById('contactForm');
    if (form) {
        // Add input event listeners for real-time validation
        const fields = ['nome', 'cognome', 'telefono', 'email'];
        fields.forEach(fieldName => {
            const field = form.querySelector(`#${fieldName}`) || document.getElementById(fieldName);
            if (field) {
                field.addEventListener('blur', function() {
                    const error = validateField(fieldName, this.value);
                    showFieldError(fieldName, error);
                });
                
                field.addEventListener('input', function() {
                    // Clear error message when user starts typing
                    showFieldError(fieldName, '');
                });
            }
        });
        
        // Privacy checkbox validation
        const privacyField = document.getElementById('privacy');
        if (privacyField) {
            privacyField.addEventListener('change', function() {
                const error = validateField('privacy', this.checked);
                showFieldError('privacy', error);
            });
        }
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause any heavy animations
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible, resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Cookie Banner Management
function showCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.display = 'block';
        // Add class for animation
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);
    }
}

function hideCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.display = 'none';
        banner.classList.remove('show');
    }
}

function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        // Show banner after a short delay
        setTimeout(showCookieBanner, 1000);
    }
}

function acceptAllCookies() {
    const consent = {
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    hideCookieBanner();
    
    // Load analytics and marketing scripts here if needed
    loadAnalyticsScripts();
    loadMarketingScripts();
}

function openCookieSettings() {
    const modal = document.getElementById('cookieSettingsModal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Load current preferences
        const consent = JSON.parse(localStorage.getItem('cookieConsent') || '{}');
        
        const analyticsToggle = document.getElementById('analyticsCookies');
        const marketingToggle = document.getElementById('marketingCookies');
        
        if (analyticsToggle) analyticsToggle.checked = consent.analytics || false;
        if (marketingToggle) marketingToggle.checked = consent.marketing || false;
    }
}

function closeCookieSettings() {
    const modal = document.getElementById('cookieSettingsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function saveCookiePreferences() {
    const analyticsConsent = document.getElementById('analyticsCookies')?.checked || false;
    const marketingConsent = document.getElementById('marketingCookies')?.checked || false;
    
    const consent = {
        necessary: true, // Always true
        analytics: analyticsConsent,
        marketing: marketingConsent,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    
    closeCookieSettings();
    hideCookieBanner();
    
    // Load scripts based on consent
    if (analyticsConsent) {
        loadAnalyticsScripts();
    }
    if (marketingConsent) {
        loadMarketingScripts();
    }
}

function loadAnalyticsScripts() {
    // Placeholder for loading analytics scripts (e.g., Google Analytics)
    console.log('Loading analytics scripts...');
    // Example: Load Google Analytics
    // gtag('config', 'GA_MEASUREMENT_ID');
}

function loadMarketingScripts() {
    // Placeholder for loading marketing scripts
    console.log('Loading marketing scripts...');
    // Example: Load Facebook Pixel, Google Ads, etc.
}

// Close cookie settings modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('cookieSettingsModal');
    if (event.target === modal) {
        closeCookieSettings();
    }
});

// Initialize cookie banner on page load
document.addEventListener('DOMContentLoaded', function() {
    checkCookieConsent();
});