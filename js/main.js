/**
 * NotebookLM101 - Main JavaScript
 * 新潮波普风版本
 */

(function() {
    'use strict';

    // 章节配置
    const sections = [
        { id: 'hero', title: '首页' },
        { id: 'quick-start', title: '快速入门' },
        { id: 'intro', title: 'NotebookLM 是什么' },
        { id: 'features', title: '核心功能' },
        { id: 'users', title: '适合谁用' },
        { id: 'not-suitable', title: '谁不适合' },
        { id: 'reviews', title: '用户评价' },
        { id: 'faq', title: '常见问题' },
        { id: 'compare', title: '竞品对比' },
        { id: 'get-started', title: '立即开始' },
        { id: 'final-cta', title: '试用' }
    ];

    // DOM 加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        initProgressBar();
        initNavigation();
        initFAQ();
        initSmoothScroll();
    });

    /**
     * 初始化阅读进度条
     */
    function initProgressBar() {
        const progressBar = document.getElementById('progressBar');
        if (!progressBar) return;

        function updateProgress() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollableHeight = documentHeight - windowHeight;
            const progress = (scrollTop / scrollableHeight) * 100;

            progressBar.style.width = Math.min(progress, 100) + '%';
        }

        window.addEventListener('scroll', throttle(updateProgress, 50));
        updateProgress();
    }

    /**
     * 初始化目录导航（抽屉式）
     */
    function initNavigation() {
        const fab = document.getElementById('fab');
        const mobileDrawer = document.getElementById('mobileDrawer');
        const drawerNav = document.getElementById('drawerNav');
        const drawerClose = document.getElementById('drawerClose');
        const drawerOverlay = document.getElementById('drawerOverlay');

        if (!fab || !mobileDrawer || !drawerNav) return;

        // 生成导航链接
        const navHTML = sections.map(section => {
            const sectionElement = document.getElementById(section.id);
            if (!sectionElement) return '';

            const title = sectionElement.querySelector('.section-title, .hero-title, .quick-start-title, .final-cta-title');
            const displayTitle = title ? title.textContent.replace(/^[^\s]+\s*/, '') : section.title;

            return `<a href="#${section.id}" class="drawer-link" data-section="${section.id}">${displayTitle}</a>`;
        }).join('');
        drawerNav.innerHTML = navHTML;

        // 绑定点击事件
        document.querySelectorAll('.drawer-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 20;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    closeMobileDrawer();
                }
            });
        });

        // 打开抽屉
        fab.addEventListener('click', function() {
            openMobileDrawer();
        });

        // 关闭按钮
        if (drawerClose) {
            drawerClose.addEventListener('click', function() {
                closeMobileDrawer();
            });
        }

        // 点击遮罩关闭
        if (drawerOverlay) {
            drawerOverlay.addEventListener('click', function() {
                closeMobileDrawer();
            });
        }

        // ESC 键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
                closeMobileDrawer();
            }
        });

        // 初始化滚动监听（高亮当前章节）
        initScrollSpy();
    }

    /**
     * 初始化滚动监听（目录高亮）
     */
    function initScrollSpy() {
        const drawerLinks = document.querySelectorAll('.drawer-link');

        if (drawerLinks.length === 0) return;

        function updateActiveSection() {
            const scrollPosition = window.pageYOffset + 100;

            let activeSection = sections[0].id;

            sections.forEach(section => {
                const element = document.getElementById(section.id);
                if (element) {
                    const sectionTop = element.offsetTop;
                    const sectionBottom = sectionTop + element.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        activeSection = section.id;
                    }
                }
            });

            // 更新目录高亮
            drawerLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === activeSection) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', throttle(updateActiveSection, 100));
        updateActiveSection();
    }

    /**
     * 打开移动端抽屉
     */
    function openMobileDrawer() {
        const mobileDrawer = document.getElementById('mobileDrawer');
        const drawerOverlay = document.getElementById('drawerOverlay');

        if (mobileDrawer) mobileDrawer.classList.add('open');
        if (drawerOverlay) drawerOverlay.classList.add('open');

        document.body.style.overflow = 'hidden';
    }

    /**
     * 关闭移动端抽屉
     */
    function closeMobileDrawer() {
        const mobileDrawer = document.getElementById('mobileDrawer');
        const drawerOverlay = document.getElementById('drawerOverlay');

        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('open');

        document.body.style.overflow = '';
    }

    /**
     * 初始化 FAQ 手风琴
     */
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        if (faqItems.length === 0) return;

        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');

            header.addEventListener('click', function() {
                const isExpanded = item.classList.contains('expanded');

                // 关闭其他所有项
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('expanded');
                    }
                });

                // 切换当前项
                item.classList.toggle('expanded', !isExpanded);
            });
        });
    }

    /**
     * 初始化平滑滚动
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href === '#' || href.length < 2) return;

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();
                    const offsetTop = targetElement.offsetTop - 20;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * 节流函数
     */
    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                return func.apply(this, args);
            }
        };
    }

})();
