// ==========================================
// PORTFOLIO - SCRIPT PRINCIPAL
// ==========================================

// ==========================================
// TYPING EFFECT
// ==========================================

const typingTexts = [
    "Développeur Frontend Junior",
    "Créateur d'interfaces modernes",
    "Passionné par le code",
    "Futur spécialiste FinTech"
];

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;

function typeEffect() {

    const typingElement = document.getElementById("typing-text");

    if (!typingElement) return;

    const currentText = typingTexts[typingIndex];

    if (isDeleting) {

        charIndex--;

    } else {

        charIndex++;

    }

    typingElement.textContent =
        currentText.substring(0, charIndex);

    let speed = typingSpeed;

    if (isDeleting) {

        speed = 50;

    }

    if (!isDeleting && charIndex === currentText.length) {

        speed = 1800;

        isDeleting = true;

    }

    else if (isDeleting && charIndex === 0) {

        isDeleting = false;

        typingIndex =
            (typingIndex + 1) %
            typingTexts.length;

        speed = 400;

    }

    setTimeout(typeEffect, speed);

}

// ==========================================
// THEME
// ==========================================

function initializeTheme() {

    const toggle =
        document.getElementById("theme-toggle");

    const darkIcon =
        document.getElementById("theme-toggle-dark-icon");

    const lightIcon =
        document.getElementById("theme-toggle-light-icon");

    const html =
        document.documentElement;

    function updateIcons(theme) {

        if (!darkIcon || !lightIcon) return;

        if (theme === "dark") {

            darkIcon.classList.add("hidden");
            lightIcon.classList.remove("hidden");

        }

        else {

            darkIcon.classList.remove("hidden");
            lightIcon.classList.add("hidden");

        }

    }

    function setTheme(theme) {

        if (theme === "dark") {

            html.classList.add("dark");

        }

        else {

            html.classList.remove("dark");

        }

        localStorage.setItem("theme", theme);

        updateIcons(theme);

    }

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme) {

        setTheme(savedTheme);

    }

    else {

        setTheme("light");

    }

    if (toggle) {

        toggle.addEventListener("click", () => {

            const theme =
                html.classList.contains("dark")
                    ? "light"
                    : "dark";

            setTheme(theme);

        });

    }

}

// ==========================================
// NAVIGATION
// ==========================================

function initializeNavigation() {

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll("main section[id]");

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");

            if (!href.startsWith("#")) return;

            event.preventDefault();

            const section =
                document.querySelector(href);

            if (section) {

                section.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    function updateActiveLink() {

        const scroll =
            window.scrollY + 120;

        let current = "";

        sections.forEach(section => {

            if (section.offsetTop <= scroll) {

                current =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.toggle(

                "active",

                link.getAttribute("href") ===
                "#" + current

            );

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    updateActiveLink();

}

// ==========================================
// OBSERVER
// ==========================================

function initializeIntersectionObserver() {

    const options = {

        threshold: 0.15,

        rootMargin: "0px 0px -80px 0px"

    };

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                    }

                });

            },

            options

        );

    document.querySelectorAll(

        ".skill-card, .info-card, .timeline-item, .project-card-modern"

    )

    .forEach(element => {

        observer.observe(element);

    });

}

// ==========================================
// FOOTER
// ==========================================

function updateYear() {

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}

// ==========================================
// RETOUR EN HAUT (facultatif)
// ==========================================

function initializeBackToTop() {

    const button =
        document.getElementById("back-to-top");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.remove("hidden");

        }

        else {

            button.classList.add("hidden");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();

    initializeNavigation();

    initializeIntersectionObserver();

    initializeBackToTop();

    updateYear();

    typeEffect();

    if (!CSS.supports("scroll-behavior", "smooth")) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }

});