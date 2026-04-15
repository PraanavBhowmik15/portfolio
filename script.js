/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

let mx = 0, my = 0;   // mouse position (dot follows instantly)
let rx = 0, ry = 0;   // ring position  (ring lags)

if (dot && ring) {
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    (function animateRing() {
        rx += (mx - rx) * 0.11;
        ry += (my - ry) * 0.11;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animateRing);
    })();

    // enlarge ring over interactive elements
    const hoverEls = document.querySelectorAll(
        'a, button, .skill-card, .proj-card, .tl-card, .tech-pills li, .btn-primary, .btn-contact'
    );
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
    });
}

/* ============================================================
   TYPEWRITER
   ============================================================ */
const titles = [
    'Full Stack AI Engineer.',
    'LLM Systems Builder.',
    'RAG & Agentic AI Dev.',
    'Python Backend Expert.',
];
let tIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeStep() {
    if (!typedEl) return;
    const cur = titles[tIdx];
    typedEl.textContent = deleting
        ? cur.slice(0, --cIdx)
        : cur.slice(0, ++cIdx);

    let delay = deleting ? 48 : 80;
    if (!deleting && cIdx === cur.length)  { delay = 2000; deleting = true; }
    else if (deleting && cIdx === 0)        { deleting = false; tIdx = (tIdx + 1) % titles.length; delay = 350; }
    setTimeout(typeStep, delay);
}
setTimeout(typeStep, 1600);

/* ============================================================
   NAVBAR SCROLL STATE
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
    highlightNav();
}, { passive: true });

/* ============================================================
   MOBILE MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-link, .btn-hire').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('open');
        navMenu?.classList.remove('open');
    });
});

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
            window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
        }
    });
});

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function highlightNav() {
    const y = window.pageYOffset;
    sections.forEach(sec => {
        const top = sec.offsetTop - 140;
        if (y >= top && y < top + sec.offsetHeight) {
            navLinks.forEach(l => {
                l.classList.remove('active');
                if (l.getAttribute('href') === `#${sec.id}`) l.classList.add('active');
            });
        }
    });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('visible'), delay);
        revealObs.unobserve(el);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// stagger delays for grid children
document.querySelectorAll('.skills-grid .reveal-item').forEach((el, i) => {
    el.dataset.delay = i * 90;
});
document.querySelectorAll('.projects-grid .reveal-item').forEach((el, i) => {
    el.dataset.delay = i * 100;
});
document.querySelectorAll('.tl-item').forEach((el, i) => {
    el.dataset.delay = i * 130;
});

document.querySelectorAll('.reveal-item').forEach(el => revealObs.observe(el));

/* ============================================================
   CONSOLE EASTER EGG
   ============================================================ */
console.log('%c👋 Hey fellow dev!', 'color:#a855f7;font-size:17px;font-weight:bold;');
console.log('%cLike what you see? → praanavbhowmik15@gmail.com', 'color:#06b6d4;font-size:13px;');
