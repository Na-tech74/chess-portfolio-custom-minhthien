document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu elements
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    const headerMobile = document.querySelector('.header-mobile');
    const desktopHeader = document.querySelector('.desktop-header');

    // ===== Mobile Menu =====
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        navOverlay.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // ===== Header Scroll Effect =====
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            if (headerMobile) headerMobile.classList.add('scrolled');
            if (desktopHeader) desktopHeader.classList.add('scrolled');
        } else {
            if (headerMobile) headerMobile.classList.remove('scrolled');
            if (desktopHeader) desktopHeader.classList.remove('scrolled');
        }
    });

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 70;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Back to Top =====
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            backToTopBtn.classList.toggle('active', window.scrollY > 300);
        });
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Animate Progress Bars =====
    const progressBars = document.querySelectorAll('.progress-bar');
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar) && bar.style.width === '0%') {
                bar.style.width = width;
            }
        });
    }
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }
    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars();

    // ===== Contact Form =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể ♟️');
            this.reset();
        });
    }

    // ===== Newsletter Form =====
    const newsletterBtn = document.querySelector('.footer-newsletter .btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function () {
            const emailInput = this.closest('.input-group').querySelector('input[type="email"]');
            if (emailInput?.value) {
                alert('Cảm ơn bạn đã đăng ký nhận tin! ♟️');
                emailInput.value = '';
            } else {
                alert('Vui lòng nhập địa chỉ email của bạn.');
            }
        });
    }

    // ===== Chess Pieces Floating Animation =====
    function createFloatingPieces() {
        const pieces = ['\u2654', '\u2655', '\u2656', '\u2657', '\u2658', '\u2659'];
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const pos = section.style.position;
            if (pos !== 'relative' && pos !== 'absolute' && pos !== 'fixed') {
                section.style.position = 'relative';
            }
            for (let i = 0; i < 3; i++) {
                const piece = document.createElement('div');
                piece.className = 'floating-piece';
                piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
                piece.style.left = (10 + Math.random() * 80) + '%';
                piece.style.top = (10 + Math.random() * 80) + '%';
                piece.style.fontSize = (2 + Math.random() * 3) + 'rem';
                piece.style.animationDelay = (Math.random() * 10) + 's';
                piece.style.animationDuration = (12 + Math.random() * 10) + 's';
                section.appendChild(piece);
            }
        });
    }
    createFloatingPieces();

    // ===== Active Nav Link on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});
