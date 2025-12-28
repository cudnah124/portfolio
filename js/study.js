// ============================================
// STUDY.JS - Study Page Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 1. MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ============================================
    // 2. SEARCH FUNCTIONALITY
    // ============================================
    const searchInput = document.getElementById('search-input');
    const studyCards = document.querySelectorAll('.study-card');

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase();

            studyCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tags = card.getAttribute('data-tags').toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ============================================
    // 3. CATEGORY FILTERING
    // ============================================
    const categoryBtns = document.querySelectorAll('.category-btn');
    let activeCategory = 'all';

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            activeCategory = category;

            // Update active button styling
            categoryBtns.forEach(b => {
                b.classList.remove('bg-blue-900', 'text-white', 'font-medium');
                b.classList.add('hover:bg-gray-50');
            });
            this.classList.add('bg-blue-900', 'text-white', 'font-medium');
            this.classList.remove('hover:bg-gray-50');

            // Filter cards
            filterCards();
        });
    });

    // ============================================
    // 4. TAG FILTERING
    // ============================================
    const tagFilters = document.querySelectorAll('.tag-filter');
    let activeTag = null;

    tagFilters.forEach(tag => {
        tag.addEventListener('click', function () {
            const tagName = this.getAttribute('data-tag');

            // Toggle active tag
            if (activeTag === tagName) {
                activeTag = null;
                this.style.backgroundColor = '';
                this.style.color = '';
            } else {
                // Remove previous active styling
                tagFilters.forEach(t => {
                    t.style.backgroundColor = '';
                    t.style.color = '';
                });

                // Set new active tag
                activeTag = tagName;
                this.style.backgroundColor = '#1e3a8a';
                this.style.color = 'white';
            }

            // Filter cards
            filterCards();
        });
    });

    // ============================================
    // 5. COMBINED FILTER FUNCTION
    // ============================================
    function filterCards() {
        studyCards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            const cardTags = card.getAttribute('data-tags').split(',');

            let showCard = true;

            // Category filter
            if (activeCategory !== 'all' && cardType !== activeCategory) {
                showCard = false;
            }

            // Tag filter
            if (activeTag && !cardTags.includes(activeTag)) {
                showCard = false;
            }

            // Apply filter
            if (showCard) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // ============================================
    // 6. SMOOTH SCROLL TO TOP
    // ============================================
    const backToTopBtn = document.querySelector('a[href="#"]');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    console.log('Study page loaded successfully! 🚀');
});
