document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    const toggleTheme = () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            themeIcon.setAttribute('data-lucide', 'moon');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.setAttribute('data-lucide', 'sun');
        }
        lucide.createIcons();
    };

    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        html.classList.remove('dark');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    const toggleRTL = () => {
        const currentDir = html.getAttribute('dir');
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        html.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
    };

    if (localStorage.getItem('dir') === 'rtl') {
        html.setAttribute('dir', 'rtl');
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', toggleRTL);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    }

    // Navbar Scroll Effect - Simplified for Sticky
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('shadow-sm');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.add('shadow-sm');
        }
    });

    // Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-honey-gold', 'font-semibold');
            link.classList.remove('text-gray-600', 'dark:text-gray-300');
        }
    });

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
