document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const storedTheme = localStorage.getItem('site-theme');
    if (storedTheme) {
        htmlElement.setAttribute('data-theme', storedTheme);
    }

    const updateThemeIcon = () => {
        const theme = htmlElement.getAttribute('data-theme');
        const icon = theme === 'dark' ? '🌙' : '☀️';
        themeBtn.querySelector('.icon').textContent = icon;
    };

    updateThemeIcon();

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('site-theme', newTheme);
        updateThemeIcon();
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    const searchInput = document.getElementById('search-input');

    const filterCards = () => {
        const query = searchInput ? searchInput.value.toLowerCase() : '';

        cards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() ?? '';
            const text = card.querySelector('p')?.textContent.toLowerCase() ?? '';
            const author = card.querySelector('.author')?.textContent.toLowerCase() ?? '';
            const category = card.getAttribute('data-category');
            const matchesSearch = query === '' || title.includes(query) || text.includes(query) || author.includes(query);
            const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter');
            const matchesFilter = !activeFilter || activeFilter === 'all' || category === activeFilter;

            card.style.display = matchesSearch && matchesFilter ? 'block' : 'none';
        });
    };

    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterCards();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterCards);
    }

    filterCards();

    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        const isPhilosopherDetail = path.startsWith('philosopher-') && href === 'philosophers.html';
        if (href === path || (href === 'index.html' && path === '') || isPhilosopherDetail) {
            link.classList.add('active');
        }
    });
});
