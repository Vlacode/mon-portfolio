// IA.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const htmlElement = document.documentElement;
    const contactForm = document.getElementById('contact-form');
    const cvDownloadBtn = document.getElementById('cv-download-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    const updateThemeIcons = (theme) => {
        if (!themeToggleDarkIcon || !themeToggleLightIcon) return;

        if (theme === 'dark') {
            themeToggleDarkIcon.classList.add('hidden');
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
        }
    };

    const setTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        updateThemeIcons(theme);
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
            setTheme(currentTheme === 'light' ? 'dark' : 'light');
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;

            event.preventDefault();
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, '', targetId);
            }
        });
    });

    const updateActiveNavLink = () => {
        const scrollPosition = window.scrollY + 120;

        let currentSectionId = '';

        sections.forEach((section) => {
            if (section.offsetTop <= scrollPosition) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${currentSectionId}`);
            link.setAttribute('aria-current', href === `#${currentSectionId}` ? 'page' : 'false');
        });
    };

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();

    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', () => {
            alert('CV téléchargé');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Veuillez remplir tous les champs du formulaire.');
            } else if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
            } else {
                alert(`Merci pour votre message, ${name} ! Je vous recontacterai bientôt.`);
                contactForm.reset();
            }
        });
    }
});
