/* ==========================================================================
   PRODUCTION READY JAVASCRIPT - SUNITA PATTANAYAK PORTFOLIO
   Fully Animated · Every Element Animated · Premium Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ====================================================================
    // 0. THEME SWITCHER (White Mode & Shadow Black Dark Mode)
    // ====================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');
    const mobileThemeText = document.getElementById('mobile-theme-text');

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            if (themeToggleIcon) {
                themeToggleIcon.className = 'fa-solid fa-moon text-sm text-cyan-400 transition-transform duration-300';
            }
            if (mobileThemeIcon) {
                mobileThemeIcon.className = 'fa-solid fa-moon text-xs text-cyan-400';
            }
            if (mobileThemeText) {
                mobileThemeText.textContent = 'Dark Mode';
            }
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            if (themeToggleIcon) {
                themeToggleIcon.className = 'fa-solid fa-sun text-sm text-amber-500 transition-transform duration-300';
            }
            if (mobileThemeIcon) {
                mobileThemeIcon.className = 'fa-solid fa-sun text-xs text-amber-500';
            }
            if (mobileThemeText) {
                mobileThemeText.textContent = 'Light Mode';
            }
        }
        localStorage.setItem('portfolio-theme', theme);
    }

    const currentSavedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(currentSavedTheme);

    function toggleTheme() {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        const nextTheme = isCurrentlyDark ? 'light' : 'dark';
        applyTheme(nextTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }

    // ====================================================================
    // 1. CONTACT FORM HANDLING WITH FORMSUBMIT.CO
    // ====================================================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            submitBtn.disabled = true;
            btnText.innerText = "Sending Message...";
            btnIcon.className = "fa-solid fa-spinner animate-spin text-xs";

            // Set current Indian Standard Time (IST - Asia/Kolkata)
            const now = new Date();
            const istTime = now.toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'medium'
            }) + ' IST';

            const timeInput = document.getElementById('sent-time-ist');
            if (timeInput) {
                timeInput.value = istTime;
            }

            try {
                const formData = new FormData(this);
                const dataObj = Object.fromEntries(formData);
                dataObj['Sent_Time_IST'] = istTime;

                const response = await fetch('https://formsubmit.co/ajax/sunitapattanayak2005@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(dataObj)
                });

                const result = await response.json();

                if (result.success === "true" || result.success === true || response.ok) {
                    showToast('Message sent directly to Sunita\'s Gmail! 🎉', 'success');
                    contactForm.reset();
                } else {
                    showToast('Sending message...', 'info');
                    this.submit();
                }
            } catch (err) {
                console.error('AJAX error, falling back to direct submit:', err);
                this.submit();
            } finally {
                submitBtn.disabled = false;
                btnText.innerText = "Send Message";
                btnIcon.className = "fa-solid fa-paper-plane text-xs";
            }
        });
    }


    // ====================================================================
    // 2. INITIALIZE SMOOTH SCROLL (LENIS)
    // ====================================================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Smooth scroll to anchor links using Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                lenis.scrollTo(targetElement, {
                    offset: -80,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });

    // ====================================================================
    // 3. PRELOADER ANIMATION & CANVAS PARTICLES
    // ====================================================================
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    const loaderCount = document.getElementById('loader-count');
    const heroSection = document.getElementById('hero');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        preloader.style.display = 'none';
                        // Trigger hero entrance animations
                        if (heroSection) {
                            heroSection.classList.add('hero-loaded');
                        }
                    }
                });
            }, 300);
        }
        loaderBar.style.width = `${progress}%`;
        loaderCount.innerText = `${progress}%`;
    }, 100);

    // Preloader Background Canvas
    const pCanvas = document.getElementById('loader-particles');
    if (pCanvas) {
        const pCtx = pCanvas.getContext('2d');
        pCanvas.width = window.innerWidth;
        pCanvas.height = window.innerHeight;

        const particles = Array.from({ length: 40 }, () => ({
            x: Math.random() * pCanvas.width,
            y: Math.random() * pCanvas.height,
            radius: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 1.5,
            dy: (Math.random() - 0.5) * 1.5
        }));

        function animateLoaderParticles() {
            if (progress >= 100) return;
            pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
            pCtx.fillStyle = 'rgba(6, 182, 212, 0.4)';
            particles.forEach(p => {
                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                pCtx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > pCanvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > pCanvas.height) p.dy *= -1;
            });
            requestAnimationFrame(animateLoaderParticles);
        }
        animateLoaderParticles();
    }

    // ====================================================================
    // 4. MAIN BACKGROUND CANVAS (CONNECTED PARTICLE NETWORK)
    // ====================================================================
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        const ctx = bgCanvas.getContext('2d');
        let width = bgCanvas.width = window.innerWidth;
        let height = bgCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = bgCanvas.width = window.innerWidth;
            height = bgCanvas.height = window.innerHeight;
        });

        let mouseX = width / 2;
        let mouseY = height / 2;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const connectParticles = Array.from({ length: 60 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.2,
            color: ['rgba(6, 182, 212,', 'rgba(139, 92, 246,', 'rgba(59, 130, 246,'][Math.floor(Math.random() * 3)]
        }));

        function drawConnectedBg() {
            ctx.clearRect(0, 0, width, height);

            // Draw connections between particles
            for (let i = 0; i < connectParticles.length; i++) {
                for (let j = i + 1; j < connectParticles.length; j++) {
                    const dx = connectParticles[i].x - connectParticles[j].x;
                    const dy = connectParticles[i].y - connectParticles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(connectParticles[i].x, connectParticles[i].y);
                        ctx.lineTo(connectParticles[j].x, connectParticles[j].y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse cursor
                const mDx = connectParticles[i].x - mouseX;
                const mDy = connectParticles[i].y - mouseY;
                const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
                if (mDist < 200) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.12 * (1 - mDist / 200)})`;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(connectParticles[i].x, connectParticles[i].y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                }
            }

            // Draw particles
            connectParticles.forEach(p => {
                ctx.fillStyle = `${p.color} ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
            });
            requestAnimationFrame(drawConnectedBg);
        }
        drawConnectedBg();
    }

    // ====================================================================
    // 5. CUSTOM CURSOR TRACKING — Enhanced
    // ====================================================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    if (cursorDot && cursorRing) {
        window.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            gsap.to(cursorDot, { x, y, duration: 0.1 });
            gsap.to(cursorRing, { x, y, duration: 0.25, ease: "power2.out" });
        });

        const hoverables = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .service-card, .cert-card');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
        });
    }

    // ====================================================================
    // 6. SCROLL PROGRESS BAR
    // ====================================================================
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / scrollHeight) * 100;
        document.getElementById('scroll-progress').style.width = `${scrolled}%`;
    });

    // ====================================================================
    // 7. TYPING ANIMATION (HERO SECTION) — Updated with backend roles
    // ====================================================================
    const typedTextSpan = document.getElementById('typed-text');
    const textArray = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Laravel & PHP Developer",
        "Machine Learning Enthusiast",
        "BCA Scholar",
        "Problem Solver"
    ];
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 80);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 40);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, 500);
        }
    }

    if (typedTextSpan) setTimeout(type, 1500);

    // ====================================================================
    // 8. MOBILE MENU TOGGLE
    // ====================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function closeMobileMenu() {
        if (menuToggle && mobileMenu) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    function openMobileMenu() {
        if (menuToggle && mobileMenu) {
            menuToggle.classList.add('active');
            mobileMenu.classList.add('active');
            mobileMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // ====================================================================
    // 9. SKILL CATEGORY FILTERING
    // ====================================================================
    const skillFilters = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillFilters.forEach(filterBtn => {
        filterBtn.addEventListener('click', () => {
            skillFilters.forEach(btn => btn.classList.remove('active'));
            filterBtn.classList.add('active');

            const category = filterBtn.getAttribute('data-filter');

            skillCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    gsap.fromTo(card, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" });
                } else {
                    gsap.to(card, {
                        opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // ====================================================================
    // 10. PROJECT SEARCH & FILTERING
    // ====================================================================
    const projectSearch = document.getElementById('project-search');
    const projectFilters = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects() {
        const query = projectSearch ? projectSearch.value.toLowerCase() : '';
        const activeFilter = document.querySelector('.project-filter-btn.active');
        const activeFilterVal = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';

        projectCards.forEach((card, i) => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const category = card.getAttribute('data-category');

            const matchesQuery = title.includes(query);
            const matchesCategory = activeFilterVal === 'all' || category === activeFilterVal;

            if (matchesQuery && matchesCategory) {
                card.style.display = 'flex';
                gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.1, ease: "back.out(1.7)" });
            } else {
                gsap.to(card, {
                    opacity: 0, y: -20, duration: 0.3, onComplete: () => {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }

    if (projectSearch) projectSearch.addEventListener('input', filterProjects);

    projectFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects();
        });
    });


    // ====================================================================
    // 11. COPY TO CLIPBOARD BUTTONS
    // ====================================================================
    document.getElementById('copy-email-btn')?.addEventListener('click', () => {
        navigator.clipboard.writeText('sunitapattanayak2005@gmail.com');
        showToast('Email address copied to clipboard!', 'info');
    });

    document.getElementById('copy-phone-btn')?.addEventListener('click', () => {
        navigator.clipboard.writeText('+91 0000000000');
        showToast('Phone number copied to clipboard!', 'info');
    });

    document.getElementById('download-cv')?.addEventListener('click', () => {
        showToast('Resume download started!', 'info');
    });

    // ====================================================================
    // 12. TOAST NOTIFICATION SYSTEM
    // ====================================================================
    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `pointer-events-auto px-5 py-3 rounded-2xl bg-dark-800 border ${type === 'success' ? 'border-cyan-500 text-cyan-400' : type === 'error' ? 'border-red-500 text-red-400' : 'border-purple-500 text-purple-400'} shadow-2xl flex items-center space-x-3 text-xs font-semibold backdrop-blur-xl transform translate-y-4 opacity-0 transition-all duration-300`;

        toast.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-xmark' : 'fa-circle-info'}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-4', 'opacity-0');
        });

        setTimeout(() => {
            toast.classList.add('translate-y-4', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // ====================================================================
    // 13. GSAP SCROLL TRIGGER — INTERSECTION OBSERVER REVEAL SYSTEM
    // ====================================================================
    gsap.registerPlugin(ScrollTrigger);

    // IntersectionObserver for .reveal elements
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ====================================================================
    // 14. SKILL BAR SCROLL ANIMATION — Bars grow from 0% to target
    // ====================================================================
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-bar-fill');
                bars.forEach((bar, i) => {
                    const targetWidth = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = targetWidth + '%';
                        bar.classList.add('animate');
                    }, i * 100);
                });
                skillBarObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
        skillBarObserver.observe(skillsGrid);
    }

    // ====================================================================
    // 15. STATS COUNTER ANIMATION — Spring easing
    // ====================================================================
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statsSection = document.getElementById('stats');
        let statsAnimated = false;

        function animateCounters() {
            if (statsAnimated) return;
            statsAnimated = true;

            statNumbers.forEach((num, i) => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 2000;

                // Use GSAP for smooth spring-like counter
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: duration / 1000,
                    delay: i * 0.15,
                    ease: "power2.out",
                    onUpdate: function () {
                        const current = Math.floor(this.targets()[0].val);
                        num.innerText = current + '+';
                    }
                });
            });
        }

        if (statsSection) {
            ScrollTrigger.create({
                trigger: statsSection,
                start: "top 80%",
                onEnter: animateCounters
            });
        }
    }

    // ====================================================================
    // 16. BACK TO TOP BUTTON
    // ====================================================================
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            if (scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        });
    }

    // ====================================================================
    // 17. MOUSE-FOLLOW GLOW ON CARDS
    // ====================================================================
    const glowCards = document.querySelectorAll('.card-hover-glow, .skill-card, .project-card, .service-card, .cert-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });

    // ====================================================================
    // 18. MAGNETIC BUTTON EFFECT
    // ====================================================================
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, {
                x: x * 0.15,
                y: y * 0.15,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
        });

        // Ripple effect on click
        btn.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ====================================================================
    // 19. ACTIVE NAV HIGHLIGHTING ON SCROLL
    // ====================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ====================================================================
    // 20. VANILLA TILT — Apply to more elements
    // ====================================================================
    if (typeof VanillaTilt !== 'undefined') {
        // Apply tilt to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            VanillaTilt.init(card, {
                max: 8,
                speed: 400,
                glare: true,
                'max-glare': 0.05,
            });
        });

        // Apply tilt to portfolio step cards
        document.querySelectorAll('.portfolio-step-card').forEach(card => {
            VanillaTilt.init(card, {
                max: 5,
                speed: 400,
                glare: true,
                'max-glare': 0.03,
            });
        });
    }

    // ====================================================================
    // 21. ANIMATED GRADIENT BORDER ROTATION
    // ====================================================================
    let borderAngle = 0;
    function animateBorderAngle() {
        borderAngle = (borderAngle + 0.5) % 360;
        document.querySelectorAll('.glow-border').forEach(el => {
            el.style.setProperty('--border-angle', borderAngle + 'deg');
        });
        requestAnimationFrame(animateBorderAngle);
    }
    animateBorderAngle();

    // ====================================================================
    // 22. GSAP PARALLAX ON BACKGROUND ELEMENTS
    // ====================================================================
    gsap.utils.toArray('.parallax-float').forEach(el => {
        gsap.to(el, {
            y: -80,
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    gsap.utils.toArray('.parallax-float-2').forEach(el => {
        gsap.to(el, {
            y: -120,
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });
    });

    // ====================================================================
    // 23. SECTION HEADER LINE ANIMATION
    // ====================================================================
    document.querySelectorAll('.section-header-line').forEach(line => {
        ScrollTrigger.create({
            trigger: line,
            start: "top 85%",
            onEnter: () => line.classList.add('revealed')
        });
    });

    // ====================================================================
    // 24. FIXED NAVBAR ON SCROLL
    // ====================================================================
    const header = document.getElementById('main-header');

    function handleNavbarScroll() {
        if (!header) return;
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;

        if (currentScrollY > 20) {
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // ====================================================================
    // 25. SOCIAL ICON STAGGER ENTRANCE
    // ====================================================================
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, i) => {
        icon.style.animationDelay = `${0.8 + i * 0.1}s`;
    });

});

// ====================================================================
// MODAL LOGIC (Global scope)
// ====================================================================
function openModal(title, desc) {
    const modal = document.getElementById('project-modal');
    const modalCard = document.getElementById('modal-card');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalCard.classList.remove('scale-95');
    modalCard.classList.add('scale-100');
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    const modalCard = document.getElementById('modal-card');

    modalCard.classList.remove('scale-100');
    modalCard.classList.add('scale-95');
    modal.classList.add('opacity-0', 'pointer-events-none');
}