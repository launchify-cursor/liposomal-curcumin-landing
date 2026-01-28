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
    initFaqViewAll();
    initReviewsFilters();
    initStickyHeader();
    initStickyCta();
    initMobileCarousel();
    initReviewsCarousel();
    initClinicalSidebar();
    initTechSidebar();
    initIngredientsSidebar();
    initBlendAccordions();
    initUrlParameterForwarding();
});

/**
 * URL Parameter Forwarding
 * Captures URL parameters from the current page and appends them to CTA links
 * Example: if page loads with ?affid=15, clicking CTA will pass affid=15 to next page
 */
function initUrlParameterForwarding() {
    // Get current URL parameters
    var currentParams = window.location.search;
    
    // Exit if no parameters to forward
    if (!currentParams || currentParams === '?') return;
    
    /**
     * Appends current URL parameters to a given URL
     * @param {string} url - The target URL
     * @returns {string} - URL with parameters appended
     */
    function appendParamsToUrl(url) {
        if (!url || url === '#' || url.startsWith('javascript:')) return url;
        
        try {
            // Handle relative and absolute URLs
            var baseUrl = url.split('?')[0];
            var existingParams = url.includes('?') ? url.split('?')[1] : '';
            
            // Parse current page params (remove leading ?)
            var newParams = currentParams.substring(1);
            
            // Combine parameters (existing params take precedence to avoid duplicates)
            var combinedParams;
            if (existingParams && newParams) {
                // Merge params, avoiding duplicates
                var existingParamsObj = new URLSearchParams(existingParams);
                var newParamsObj = new URLSearchParams(newParams);
                
                // Add new params only if they don't already exist
                newParamsObj.forEach(function(value, key) {
                    if (!existingParamsObj.has(key)) {
                        existingParamsObj.append(key, value);
                    }
                });
                combinedParams = existingParamsObj.toString();
            } else {
                combinedParams = existingParams || newParams;
            }
            
            return baseUrl + (combinedParams ? '?' + combinedParams : '');
        } catch (e) {
            return url;
        }
    }
    
    /**
     * Navigates to a URL with parameters appended
     * @param {string} url - The target URL
     */
    window.navigateWithParams = function(url) {
        window.location.href = appendParamsToUrl(url);
    };
    
    // Update all anchor tags with href that are not just "#"
    document.querySelectorAll('a[href]').forEach(function(link) {
        var href = link.getAttribute('href');
        
        // Skip anchor links, javascript links, and empty hrefs
        if (!href || href === '#' || href.startsWith('#') || href.startsWith('javascript:')) return;
        
        // Update the href with parameters
        link.setAttribute('href', appendParamsToUrl(href));
    });
    
    // Handle CTA buttons (they may use onclick or be converted to links later)
    // Store params in a data attribute for easy access
    document.querySelectorAll('.cta-button, .sticky-cta-btn').forEach(function(btn) {
        btn.setAttribute('data-url-params', currentParams);
    });
    
    // Expose utility function globally for dynamic content or manual use
    window.appendUrlParams = appendParamsToUrl;
    window.getUrlParams = function() {
        return currentParams;
    };
}

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
    // Use requestAnimationFrame to avoid forced reflow during page load
    requestAnimationFrame(function() {
        heroAccordionItems.forEach(function(item, index) {
            const content = item.querySelector('.hero-accordion-content');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
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
 * FAQ View All Toggle - Expands to show hidden FAQ items
 */
function initFaqViewAll() {
    const viewAllBtn = document.getElementById('faqViewAll');
    const faqList = document.getElementById('faqList');
    
    if (!viewAllBtn || !faqList) return;
    
    viewAllBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle expanded state
        const isExpanded = faqList.classList.contains('expanded');
        
        if (isExpanded) {
            faqList.classList.remove('expanded');
            viewAllBtn.querySelector('.faq-view-all-text').textContent = 'View All';
            
            // Close any open hidden FAQs when collapsing
            const hiddenItems = faqList.querySelectorAll('.faq-item-hidden');
            hiddenItems.forEach(function(item) {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = null;
            });
        } else {
            faqList.classList.add('expanded');
            viewAllBtn.querySelector('.faq-view-all-text').textContent = 'View Less';
        }
    });
}

/**
 * Reviews Filters, Sort, Search, and Pagination functionality
 */
function initReviewsFilters() {
    const reviewsList = document.getElementById('reviewsList');
    const searchInput = document.querySelector('.search-input');
    const sortSelect = document.querySelector('.sort-select');
    const topicPills = document.querySelectorAll('.topic-pill');
    const noResultsMessage = document.querySelector('.no-reviews-message');
    const pagination = document.getElementById('reviewsPagination');
    
    if (!reviewsList) return;
    
    let activeTopics = [];
    let currentSearch = '';
    let currentSort = 'highest';
    let currentPage = 1;
    const reviewsPerPage = 5;
    const totalPages = 10;
    
    // Get all review items
    function getReviewItems() {
        return Array.from(reviewsList.querySelectorAll('.review-item'));
    }
    
    // Get filtered reviews
    function getFilteredReviews() {
        const reviews = getReviewItems();
        return reviews.filter(function(review) {
            const text = review.querySelector('.review-text').textContent.toLowerCase();
            const topics = (review.dataset.topics || '').toLowerCase().split(',');
            
            const matchesSearch = currentSearch === '' || text.includes(currentSearch.toLowerCase());
            const matchesTopics = activeTopics.length === 0 || 
                activeTopics.some(function(topic) {
                    return topics.includes(topic.toLowerCase()) || text.includes(topic.toLowerCase());
                });
            
            return matchesSearch && matchesTopics;
        });
    }
    
    // Sort reviews array
    function sortReviewsArray(reviews) {
        return reviews.sort(function(a, b) {
            switch (currentSort) {
                case 'highest':
                    return parseInt(b.dataset.rating) - parseInt(a.dataset.rating);
                case 'lowest':
                    return parseInt(a.dataset.rating) - parseInt(b.dataset.rating);
                case 'recent':
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                case 'helpful':
                    return parseInt(b.dataset.helpful) - parseInt(a.dataset.helpful);
                default:
                    return 0;
            }
        });
    }
    
    // Update pagination display
    function updatePagination(filteredCount) {
        if (!pagination) return;
        
        const totalFilteredPages = Math.ceil(filteredCount / reviewsPerPage);
        const pageNums = pagination.querySelectorAll('.page-num');
        const prevBtn = pagination.querySelector('.page-arrow.prev');
        const nextBtn = pagination.querySelector('.page-arrow.next');
        const ellipsis = pagination.querySelector('.page-ellipsis');
        
        // Update prev/next buttons
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage >= totalFilteredPages;
        
        // Update page numbers
        pageNums.forEach(function(btn) {
            const page = parseInt(btn.dataset.page);
            btn.classList.toggle('active', page === currentPage);
            
            // Hide pages beyond filtered results
            if (page > totalFilteredPages) {
                btn.style.display = 'none';
            } else {
                btn.style.display = '';
            }
        });
        
        // Handle ellipsis visibility
        if (ellipsis) {
            ellipsis.style.display = totalFilteredPages > 6 ? '' : 'none';
        }
    }
    
    // Filter, sort, and paginate reviews
    function filterAndSortReviews() {
        const allReviews = getReviewItems();
        const filteredReviews = getFilteredReviews();
        const sortedReviews = sortReviewsArray(filteredReviews);
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * reviewsPerPage;
        const endIndex = startIndex + reviewsPerPage;
        
        // Hide all reviews first
        allReviews.forEach(function(review) {
            review.style.display = 'none';
        });
        
        // Show only reviews for current page
        sortedReviews.forEach(function(review, index) {
            if (index >= startIndex && index < endIndex) {
                review.style.display = '';
            }
        });
        
        // Reorder in DOM
        sortedReviews.forEach(function(review) {
            reviewsList.appendChild(review);
        });
        
        // Keep no results message at end
        if (noResultsMessage) {
            reviewsList.appendChild(noResultsMessage);
            noResultsMessage.style.display = sortedReviews.length === 0 ? 'block' : 'none';
        }
        
        // Update pagination
        updatePagination(sortedReviews.length);
    }
    
    // Go to specific page
    function goToPage(page) {
        const filteredCount = getFilteredReviews().length;
        const maxPage = Math.ceil(filteredCount / reviewsPerPage);
        
        currentPage = Math.max(1, Math.min(page, maxPage));
        filterAndSortReviews();
        
        // Scroll to reviews section
        reviewsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearch = e.target.value;
            currentPage = 1; // Reset to first page on search
            filterAndSortReviews();
        });
    }
    
    // Sort select handler
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            const value = e.target.value.toLowerCase();
            if (value.includes('highest')) {
                currentSort = 'highest';
            } else if (value.includes('lowest')) {
                currentSort = 'lowest';
            } else if (value.includes('recent')) {
                currentSort = 'recent';
            } else if (value.includes('helpful')) {
                currentSort = 'helpful';
            }
            currentPage = 1; // Reset to first page on sort change
            filterAndSortReviews();
        });
    }
    
    // Topic pills handler
    topicPills.forEach(function(pill) {
        pill.addEventListener('click', function() {
            const topic = pill.textContent.trim().toLowerCase();
            
            if (pill.classList.contains('active')) {
                pill.classList.remove('active');
                activeTopics = activeTopics.filter(function(t) {
                    return t !== topic;
                });
            } else {
                pill.classList.add('active');
                activeTopics.push(topic);
            }
            
            currentPage = 1; // Reset to first page on filter change
            filterAndSortReviews();
        });
    });
    
    // Pagination handlers
    if (pagination) {
        // Page number buttons
        pagination.querySelectorAll('.page-num').forEach(function(btn) {
            btn.addEventListener('click', function() {
                goToPage(parseInt(btn.dataset.page));
            });
        });
        
        // Prev button
        const prevBtn = pagination.querySelector('.page-arrow.prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentPage > 1) {
                    goToPage(currentPage - 1);
                }
            });
        }
        
        // Next button
        const nextBtn = pagination.querySelector('.page-arrow.next');
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                goToPage(currentPage + 1);
            });
        }
    }
    
    // Helpful button handlers
    const helpfulBtns = reviewsList.querySelectorAll('.helpful-btn');
    helpfulBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const countSpan = btn.querySelector('.helpful-count');
            if (countSpan && !btn.classList.contains('clicked')) {
                const currentCount = parseInt(countSpan.textContent);
                countSpan.textContent = currentCount + 1;
                btn.classList.add('clicked');
                
                const reviewItem = btn.closest('.review-item');
                if (reviewItem && btn.dataset.type === 'up') {
                    reviewItem.dataset.helpful = parseInt(reviewItem.dataset.helpful) + 1;
                }
            }
        });
    });
    
    // Initial render
    filterAndSortReviews();
}

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
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
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Sticky CTA that appears after scrolling past hero
 */
function initStickyCta() {
    const stickyCta = document.getElementById('stickyCta');
    const heroSection = document.querySelector('.hero-section');

    if (stickyCta && heroSection) {
        // Cache hero dimensions to avoid repeated layout queries
        let heroBottom = 0;
        let ticking = false;
        
        function updateHeroBottom() {
            heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        }
        
        // Measure after first paint
        requestAnimationFrame(updateHeroBottom);
        
        // Recalculate on resize
        window.addEventListener('resize', function() {
            requestAnimationFrame(updateHeroBottom);
        }, { passive: true });
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    const scrollPosition = window.pageYOffset;
                    if (scrollPosition > heroBottom - 200) {
                        stickyCta.classList.add('visible');
                    } else {
                        stickyCta.classList.remove('visible');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
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
    let cardWidth = 0;
    
    // Defer width measurement to avoid forced reflow during page load
    requestAnimationFrame(function() {
        cardWidth = cards[0].offsetWidth + 16; // Including gap
    });

    function updateCarousel() {
        // Ensure cardWidth is measured if not yet set
        if (!cardWidth) cardWidth = cards[0].offsetWidth + 16;
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
 * Option buttons toggle with price and supply text update
 */
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const siblings = this.parentElement.querySelectorAll('.option-btn');
        siblings.forEach(sib => sib.classList.remove('active'));
        this.classList.add('active');
        
        // Update price based on selected option
        const newPrice = this.getAttribute('data-price');
        if (newPrice) {
            const priceElement = document.querySelector('.price-amount');
            if (priceElement) {
                priceElement.textContent = newPrice;
            }
        }
        
        // Update supply text based on selected option
        const supplyDays = this.getAttribute('data-supply');
        if (supplyDays) {
            const supplyTextElement = document.getElementById('supplyText');
            if (supplyTextElement) {
                supplyTextElement.innerHTML = supplyDays + ' supply delivered monthly.<br>Pause or cancel anytime.';
            }
        }
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

/**
 * Technology Sidebar (Liposomal Absorption)
 */
function initTechSidebar() {
    var techOpenBtn = document.getElementById('openTechSidebar');
    var techSidebar = document.getElementById('techSidebar');
    var techOverlay = document.getElementById('techSidebarOverlay');
    var techCloseBtn = document.getElementById('techSidebarClose');

    if (!techSidebar || !techOverlay) return;

    function openTechSidebar(e) {
        e.preventDefault();
        techSidebar.classList.add('active');
        techOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeTechSidebar() {
        techSidebar.classList.remove('active');
        techOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (techOpenBtn) {
        techOpenBtn.addEventListener('click', openTechSidebar);
    }
    techOverlay.addEventListener('click', closeTechSidebar);
    if (techCloseBtn) {
        techCloseBtn.addEventListener('click', closeTechSidebar);
    }
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && techSidebar.classList.contains('active')) {
            closeTechSidebar();
        }
    });
}

/**
 * Ingredients Sidebar
 */
function initIngredientsSidebar() {
    var ingredientsOpenBtn = document.getElementById('openIngredientsSidebar');
    var ingredientsOpenBtnMobile = document.getElementById('openIngredientsSidebarMobile');
    var ingredientsOpenBtnAlt = document.getElementById('openIngredientsSidebarAlt');
    var ingredientsSidebar = document.getElementById('ingredientsSidebar');
    var ingredientsOverlay = document.getElementById('ingredientsSidebarOverlay');
    var ingredientsCloseBtn = document.getElementById('ingredientsSidebarClose');

    if (!ingredientsSidebar || !ingredientsOverlay) return;

    function openIngredientsSidebar(e) {
        e.preventDefault();
        ingredientsSidebar.classList.add('active');
        ingredientsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeIngredientsSidebar() {
        ingredientsSidebar.classList.remove('active');
        ingredientsOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (ingredientsOpenBtn) {
        ingredientsOpenBtn.addEventListener('click', openIngredientsSidebar);
    }
    if (ingredientsOpenBtnMobile) {
        ingredientsOpenBtnMobile.addEventListener('click', openIngredientsSidebar);
    }
    if (ingredientsOpenBtnAlt) {
        ingredientsOpenBtnAlt.addEventListener('click', openIngredientsSidebar);
    }
    ingredientsOverlay.addEventListener('click', closeIngredientsSidebar);
    if (ingredientsCloseBtn) {
        ingredientsCloseBtn.addEventListener('click', closeIngredientsSidebar);
    }
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && ingredientsSidebar.classList.contains('active')) {
            closeIngredientsSidebar();
        }
    });
}

/**
 * Blend Ingredient Accordions
 */
function initBlendAccordions() {
    const blendItems = document.querySelectorAll('.blend-accordion-item');
    
    if (!blendItems || blendItems.length === 0) return;
    
    blendItems.forEach(function(item) {
        const header = item.querySelector('.blend-item');
        
        if (header) {
            header.addEventListener('click', function() {
                const isOpen = item.classList.contains('active');
                
                // Close all blend accordions
                blendItems.forEach(function(otherItem) {
                    otherItem.classList.remove('active');
                });
                
                // Open clicked accordion if it was closed
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        }
    });
}
