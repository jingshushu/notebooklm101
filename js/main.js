(function () {
    "use strict";

    const body = document.body;
    const progressBar = document.getElementById("progressBar");
    const langToggle = document.getElementById("langToggle");
    const menuButton = document.getElementById("menuButton");
    const mobilePanel = document.getElementById("mobilePanel");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const mobileClose = document.getElementById("mobileClose");
    const faqItems = document.querySelectorAll(".faq-item");
    const mobileLinks = document.querySelectorAll(".mobile-nav a");

    document.addEventListener("DOMContentLoaded", function () {
        initProgressBar();
        initLanguageToggle();
        initMobileMenu();
        initFaq();
        initSmoothLinks();
    });

    function initProgressBar() {
        if (!progressBar) return;

        const updateProgress = throttle(function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? Math.min((scrollTop / totalHeight) * 100, 100) : 0;
            progressBar.style.width = progress + "%";
        }, 30);

        window.addEventListener("scroll", updateProgress);
        updateProgress();
    }

    function initLanguageToggle() {
        if (!langToggle) return;

        langToggle.addEventListener("click", function (event) {
            const chip = event.target.closest("[data-set-lang]");
            if (!chip) return;

            setLanguage(chip.getAttribute("data-set-lang"));
        });

        setLanguage(body.getAttribute("data-locale") || "zh");
    }

    function setLanguage(language) {
        body.setAttribute("data-locale", language);
        document.querySelectorAll(".lang-chip").forEach(function (chip) {
            chip.classList.toggle("is-active", chip.getAttribute("data-set-lang") === language);
        });
        document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    }

    function initMobileMenu() {
        if (!menuButton || !mobilePanel || !mobileOverlay || !mobileClose) return;

        menuButton.addEventListener("click", openMenu);
        mobileClose.addEventListener("click", closeMenu);
        mobileOverlay.addEventListener("click", closeMenu);

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        mobileLinks.forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });
    }

    function openMenu() {
        mobilePanel.classList.add("is-open");
        mobileOverlay.classList.add("is-open");
        mobilePanel.setAttribute("aria-hidden", "false");
        body.classList.add("is-locked");
    }

    function closeMenu() {
        mobilePanel.classList.remove("is-open");
        mobileOverlay.classList.remove("is-open");
        mobilePanel.setAttribute("aria-hidden", "true");
        body.classList.remove("is-locked");
    }

    function initFaq() {
        faqItems.forEach(function (item) {
            const trigger = item.querySelector(".faq-question");
            if (!trigger) return;

            trigger.addEventListener("click", function () {
                const isOpen = item.classList.contains("is-open");

                faqItems.forEach(function (entry) {
                    entry.classList.remove("is-open");
                });

                if (!isOpen) {
                    item.classList.add("is-open");
                }
            });
        });
    }

    function initSmoothLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener("click", function (event) {
                const href = this.getAttribute("href");
                if (!href || href === "#") return;

                const target = document.querySelector(href);
                if (!target) return;

                event.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 84;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            });
        });
    }

    function throttle(callback, wait) {
        let previous = 0;
        return function () {
            const now = Date.now();
            if (now - previous >= wait) {
                previous = now;
                callback();
            }
        };
    }
})();
