/**
 * Seed Landing Page - Main JavaScript
 * Interactive features: carousels, accordions, sticky elements, etc.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initAccordions();
    initHeroAccordions();
    initFaqAccordions();
    initStickyHeader();
    initStickyCta();
    initMobileCarousel();
    initReviewsCarousel();
    initClinicalSidebar();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const body = document.body;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });

        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

/**
 * Accordion functionality for benefits section
 */
function initAccordions() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(function(item) {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Close all accordions
            accordionItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Open clicked accordion if it was closed
            if (!isOpen) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Hero Benefits/Ingredients Accordion
 */
function initHeroAccordions() {
    const heroAccordionItems = document.querySelectorAll('.hero-accordion-item');

    // Initialize: expand the first item (Benefits) by default
    heroAccordionItems.forEach(function(item, index) {
        const content = item.querySelector('.hero-accordion-content');
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });

    heroAccordionItems.forEach(function(item) {
        const header = item.querySelector('.hero-accordion-header');
        const content = item.querySelector('.hero-accordion-content');

        header.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Close all hero accordions
            heroAccordionItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.hero-accordion-content').style.maxHeight = null;
            });

            // Open clicked accordion if it was closed
            if (!isOpen) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

/**
 * FAQ Accordion functionality
 */
function initFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Open clicked FAQ if it was closed
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Sticky CTA that appears after scrolling past hero
 */
function initStickyCta() {
    const stickyCta = document.getElementById('stickyCta');
    const heroSection = document.querySelector('.hero-section');

    if (stickyCta && heroSection) {
        window.addEventListener('scroll', function() {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.pageYOffset;

            if (scrollPosition > heroBottom - 200) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        });
    }
}

/**
 * Mobile Hero Carousel
 */
function initMobileCarousel() {
    const carousel = document.querySelector('.hero-mobile-carousel');
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');

    if (!carousel || slides.length === 0) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

/**
 * Reviews Carousel
 */
function initReviewsCarousel() {
    const track = document.querySelector('.reviews-track');
    const prevBtn = document.querySelector('.reviews-nav .prev');
    const nextBtn = document.querySelector('.reviews-nav .next');
    const cards = document.querySelectorAll('.review-card');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 16; // Including gap

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    // Touch/drag support
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
    });

    track.addEventListener('mouseup', (e) => {
        if (!isDown) return;
        isDown = false;
        const diff = startX - e.pageX;
        if (diff > 50 && currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        } else if (diff < -50 && currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
    });
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/**
 * Option buttons toggle
 */
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const siblings = this.parentElement.querySelectorAll('.option-btn');
        siblings.forEach(sib => sib.classList.remove('active'));
        this.classList.add('active');
    });
});

/**
 * Clinical Research Sidebar
 */
function initClinicalSidebar() {
    const sidebar = document.getElementById('clinicalSidebar');
    const overlay = document.getElementById('clinicalSidebarOverlay');
    const closeBtn = document.getElementById('clinicalSidebarClose');
    const openLinks = document.querySelectorAll('.clinical-trials-link');
    const body = document.body;

    // Exit early if essential elements don't exist
    if (!sidebar || !overlay) {
        console.log('Clinical sidebar elements not found');
        return;
    }

    // Close sidebar function
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    // Open sidebar
    if (openLinks && openLinks.length > 0) {
        openLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                sidebar.classList.add('active');
                overlay.classList.add('active');
                body.style.overflow = 'hidden';
            });
        });
    }

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeSidebar();
        });
    }

    // Click overlay to close
    overlay.addEventListener('click', closeSidebar);

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Initialize clinical accordions
    const clinicalAccordionItems = document.querySelectorAll('.clinical-accordion-item');
    
    if (clinicalAccordionItems && clinicalAccordionItems.length > 0) {
        clinicalAccordionItems.forEach(function(item) {
            const header = item.querySelector('.clinical-accordion-header');
            
            if (header) {
                header.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const isOpen = item.classList.contains('active');
                    
                    // Toggle clicked accordion
                    if (isOpen) {
                        item.classList.remove('active');
                    } else {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
}
