document.addEventListener('DOMContentLoaded', function () {

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

    const categoryBtns = document.querySelectorAll('.category-btn');
    let activeCategory = 'all';

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

            filterCards();
        });
    });

    const tagFilters = document.querySelectorAll('.tag-filter');
    let activeTag = null;

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

            filterCards();
        });
    });

    function filterCards() {
        studyCards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            const cardTags = card.getAttribute('data-tags').split(',');

            let showCard = true;

            if (activeCategory !== 'all' && cardType !== activeCategory) {
                showCard = false;
            }

            if (activeTag && !cardTags.includes(activeTag)) {
                showCard = false;
            }

            if (showCard) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

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
