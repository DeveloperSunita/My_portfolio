/* ==========================================================================
   PRODUCTION READY JAVASCRIPT - SUNITA PATTANAYAK PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. CONTACT FORM HANDLING WITH FORMSUBMIT.CO (No signup needed)
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

            try {
                const formData = new FormData(this);
                const response = await fetch('https://formsubmit.co/ajax/sunitapattanayak2005@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(Object.fromEntries(formData))
                });

                const result = await response.json();

                if (result.success) {
                    showToast('Message sent successfully! 🎉', 'success');
                    contactForm.reset();
                } else {
                    showToast('Failed to send message. Please try again.', 'error');
                    console.error('Formsubmit Error:', result);
                }
            } catch (err) {
                showToast('Failed to send message. Please try again.', 'error');
                console.error('Submit Error:', err);
            } finally {
                submitBtn.disabled = false;
                btnText.innerText = "Send Message";
                btnIcon.className = "fa-solid fa-paper-plane text-xs";
            }
        });
    }


    // 2. INITIALIZE SMOOTH SCROLL (LENIS)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis raf
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable lag smoothing in GSAP to avoid jumps
    gsap.ticker.lagSmoothing(0);

    // 2b. Smooth scroll to anchor links using Lenis
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

    // 3. PRELOADER ANIMATION & CANVAS PARTICLES
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    const loaderCount = document.getElementById('loader-count');
    const loaderStatus = document.getElementById('loader-status');

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
                    onComplete: () => preloader.style.display = 'none'
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

    // 4. MAIN BACKGROUND CANVAS (DYNAMIC PARTICLES)
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        const ctx = bgCanvas.getContext('2d');
        let width = bgCanvas.width = window.innerWidth;
        let height = bgCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = bgCanvas.width = window.innerWidth;
            height = bgCanvas.height = window.innerHeight;
        });

        const bgParticles = Array.from({ length: 60 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        }));

        function drawBg() {
            ctx.clearRect(0, 0, width, height);
            bgParticles.forEach(p => {
                ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
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
            requestAnimationFrame(drawBg);
        }
        drawBg();
    }

    // 5. CUSTOM CURSOR TRACKING
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    window.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;

        gsap.to(cursorDot, { x, y, duration: 0.1 });
        gsap.to(cursorRing, { x, y, duration: 0.3 });
    });

    const hoverables = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
    });

    // 6. SCROLL PROGRESS BAR
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = `${scrolled}%`;
    });

    // 7. TYPING ANIMATION (HERO SECTION)
    const typedTextSpan = document.getElementById('typed-text');
    const textArray = ["BCA Scholar", "Frontend Developer", "DBMS & Java Developer", "Problem Solver"];
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, 500);
        }
    }

    if (typedTextSpan) setTimeout(type, 1000);

    // 8. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        const isOpen = menuToggle.classList.contains('active');
        mobileMenu.style.opacity = isOpen ? '1' : '0';
        mobileMenu.style.pointerEvents = isOpen ? 'auto' : 'none';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.style.opacity = '0';
            mobileMenu.style.pointerEvents = 'none';
        });
    });

    // 9. SKILL CATEGORY FILTERING
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
                    gsap.fromTo(card, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 10. PROJECT SEARCH & FILTERING
    const projectSearch = document.getElementById('project-search');
    const projectFilters = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects() {
        const query = projectSearch.value.toLowerCase();
        const activeFilter = document.querySelector('.project-filter-btn.active').getAttribute('data-filter');

        projectCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const category = card.getAttribute('data-category');

            const matchesQuery = title.includes(query);
            const matchesCategory = activeFilter === 'all' || category === activeFilter;

            if (matchesQuery && matchesCategory) {
                card.style.display = 'flex';
                gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
            } else {
                card.style.display = 'none';
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


    // 12. COPY TO CLIPBOARD BUTTONS
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

    // 13. TOAST NOTIFICATION SYSTEM
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

    // 14. GSAP SCROLL TRIGGER REVEAL ANIMATIONS
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 15. STATS COUNTER ANIMATION
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statsSection = document.getElementById('stats');
        let statsAnimated = false;

        function animateCounters() {
            if (statsAnimated) return;
            statsAnimated = true;

            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                    }
                    num.innerText = Math.floor(current) + (target >= 100 ? '+' : '+');
                }, 16);
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

    // 16. BACK TO TOP BUTTON
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

    // 17. ENHANCED BACKGROUND PARTICLES WITH CONNECTIONS
    // Override the basic bg canvas with connected particle network
    if (bgCanvas) {
        const connectCtx = bgCanvas.getContext('2d');
        const connectParticles = Array.from({ length: 50 }, () => ({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.2,
            color: ['rgba(6, 182, 212,', 'rgba(139, 92, 246,', 'rgba(59, 130, 246,'][Math.floor(Math.random() * 3)]
        }));

        function drawConnectedBg() {
            connectCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

            // Draw connections
            for (let i = 0; i < connectParticles.length; i++) {
                for (let j = i + 1; j < connectParticles.length; j++) {
                    const dx = connectParticles[i].x - connectParticles[j].x;
                    const dy = connectParticles[i].y - connectParticles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        connectCtx.beginPath();
                        connectCtx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 150)})`;
                        connectCtx.lineWidth = 0.5;
                        connectCtx.moveTo(connectParticles[i].x, connectParticles[i].y);
                        connectCtx.lineTo(connectParticles[j].x, connectParticles[j].y);
                        connectCtx.stroke();
                    }
                }
            }

            // Draw particles
            connectParticles.forEach(p => {
                connectCtx.fillStyle = `${p.color} ${p.opacity})`;
                connectCtx.beginPath();
                connectCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                connectCtx.fill();

                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = bgCanvas.width;
                if (p.x > bgCanvas.width) p.x = 0;
                if (p.y < 0) p.y = bgCanvas.height;
                if (p.y > bgCanvas.height) p.y = 0;
            });
            requestAnimationFrame(drawConnectedBg);
        }
        // Start the enhanced version (replaces the basic drawBg)
        drawConnectedBg();
    }

});

// Modal Logic
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