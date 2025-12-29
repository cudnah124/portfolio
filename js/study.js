// ============================================
// STUDY.JS - Dynamic Study Page with JSON Data
// ============================================

let allStudyData = [];
let studyCards = [];

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 1. LOAD STUDY DATA FROM JSON
    // ============================================
    loadStudyData();

    // ============================================
    // 2. MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ============================================
    // 7. SMOOTH SCROLL TO TOP
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
});

// ============================================
// LOAD AND RENDER STUDY DATA
// ============================================
async function loadStudyData() {
    try {
        const response = await fetch('data/study-data.json');
        allStudyData = await response.json();
        renderStudyCards(allStudyData);
        initializeFilters();
        console.log('Study data loaded successfully! 🚀');
    } catch (error) {
        console.error('Error loading study data:', error);
        const container = document.getElementById('study-cards-container');
        container.innerHTML = '<p class="text-red-600">Error loading study data. Please check the console.</p>';
    }
}

// ============================================
// RENDER STUDY CARDS
// ============================================
function renderStudyCards(data) {
    const container = document.getElementById('study-cards-container');
    container.innerHTML = '';

    data.forEach(item => {
        const card = createStudyCard(item);
        container.appendChild(card);
    });

    studyCards = document.querySelectorAll('.study-card');
    lucide.createIcons();
}

// ============================================
// CREATE STUDY CARD ELEMENT
// ============================================
function createStudyCard(item) {
    const card = document.createElement('div');
    card.className = 'study-card bg-white rounded-xl p-6 border border-gray-100 shadow-sm';
    card.setAttribute('data-type', item.type);
    card.setAttribute('data-tags', item.tags.map(t => t.toLowerCase().replace(/\s+/g, '-')).join(','));

    const iconClass = item.type === 'youtube' ? 'youtube' : 'file-text';
    const iconColor = item.type === 'youtube' ? 'text-red-600' : 'text-blue-900';
    const linkText = item.type === 'youtube' ? 'Watch Video' : 'Read Paper';

    card.innerHTML = `
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <i data-lucide="calendar" class="w-4 h-4"></i>
            <span>${item.date}</span>
            <span>•</span>
            <i data-lucide="clock" class="w-4 h-4"></i>
            <span>${item.duration}</span>
        </div>

        <div class="flex items-start gap-3 mb-3">
            <i data-lucide="${iconClass}" class="w-6 h-6 ${iconColor} flex-shrink-0 mt-1"></i>
            <h3 class="text-xl font-bold text-gray-900">${item.title}</h3>
        </div>

        <p class="text-gray-600 mb-4 leading-relaxed">
            ${item.description}
        </p>

        <div class="flex flex-wrap gap-2 mb-4">
            ${item.tags.map(tag => `<span class="tag px-3 py-1 rounded-full text-xs">${tag}</span>`).join('')}
        </div>

        <a href="${item.url}" target="_blank"
            class="inline-flex items-center gap-2 text-blue-900 hover:text-blue-950 font-medium text-sm transition-colors">
            <span>${linkText}</span>
            <i data-lucide="external-link" class="w-4 h-4"></i>
        </a>
    `;

    return card;
}

// ============================================
// INITIALIZE FILTERS
// ============================================
function initializeFilters() {
    const searchInput = document.getElementById('search-input');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const tagFilters = document.querySelectorAll('.tag-filter');

    let activeCategory = 'all';
    let activeTag = null;

    // Search functionality
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

    // Category filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            activeCategory = category;

            categoryBtns.forEach(b => {
                b.classList.remove('bg-blue-900', 'text-white', 'font-medium');
                b.classList.add('hover:bg-gray-50');
            });
            this.classList.add('bg-blue-900', 'text-white', 'font-medium');
            this.classList.remove('hover:bg-gray-50');

            filterCards(activeCategory, activeTag);
        });
    });

    // Tag filtering
    tagFilters.forEach(tag => {
        tag.addEventListener('click', function () {
            const tagName = this.getAttribute('data-tag');

            if (activeTag === tagName) {
                activeTag = null;
                this.style.backgroundColor = '';
                this.style.color = '';
            } else {
                tagFilters.forEach(t => {
                    t.style.backgroundColor = '';
                    t.style.color = '';
                });

                activeTag = tagName;
                this.style.backgroundColor = '#1e3a8a';
                this.style.color = 'white';
            }

            filterCards(activeCategory, activeTag);
        });
    });

    function filterCards(category, tag) {
        studyCards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            const cardTags = card.getAttribute('data-tags').split(',');

            let showCard = true;

            if (category !== 'all' && cardType !== category) {
                showCard = false;
            }

            if (tag && !cardTags.includes(tag)) {
                showCard = false;
            }

            if (showCard) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}
