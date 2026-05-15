document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggles = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];
    const html = document.documentElement;

    const updateThemeUI = (isDark) => {
        const themeIcon = document.getElementById('theme-icon');
        const themeIconMobile = document.querySelector('#theme-toggle-mobile i, #theme-toggle-mobile svg');
        
        if (isDark) {
            html.classList.add('dark');
            if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
            if (themeIconMobile) themeIconMobile.setAttribute('data-lucide', 'sun');
        } else {
            html.classList.remove('dark');
            if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
            if (themeIconMobile) themeIconMobile.setAttribute('data-lucide', 'moon');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    const toggleTheme = () => {
        const isDark = !html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeUI(isDark);
    };

    // Initial Theme Sync
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    updateThemeUI(isDark);

    themeToggles.forEach(btn => btn?.addEventListener('click', toggleTheme));

    // RTL Toggle Logic
    const rtlToggles = [document.getElementById('rtl-toggle'), document.getElementById('rtl-toggle-mobile')];
    const toggleRTL = () => {
        const isRTL = html.getAttribute('dir') !== 'rtl';
        const dir = isRTL ? 'rtl' : 'ltr';
        html.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);
    };

    if (localStorage.getItem('dir') === 'rtl') {
        html.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(btn => btn?.addEventListener('click', toggleRTL));

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

    // Initialize FAQ Accordion
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.parentElement;
            const content = item.querySelector('.faq-content');
            const icon = trigger.querySelector('[data-lucide]');
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-content').style.maxHeight = null;
                    const otherIcon = otherItem.querySelector('[data-lucide]');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current item
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.style.transform = 'rotate(45deg)';
            }
        });
    });

    // Password Visibility Toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('input');
            const icon = toggle.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }
            lucide.createIcons();
        });
    });

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
