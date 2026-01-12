/**
 * Projects page specific JavaScript
 * Handles filtering, view toggle, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
    initViewToggle();
    initProjectHoverEffects();
});

/**
 * Project filtering
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter and animate
            let visibleIndex = 0;
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-categories') || '';

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = '';

                    // Staggered animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px) scale(0.95)';

                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, visibleIndex * 100);

                    visibleIndex++;
                } else {
                    // Fade out then hide
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-10px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * View toggle (grid/list)
 */
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const projectsGrid = document.getElementById('projects-grid');

    if (!viewButtons.length || !projectsGrid) return;

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const view = btn.getAttribute('data-view');

            if (view === 'list') {
                projectsGrid.style.gridTemplateColumns = '1fr';
                projectsGrid.querySelectorAll('.project-card').forEach(card => {
                    card.style.gridColumn = 'span 1';
                });
            } else {
                projectsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                projectsGrid.querySelectorAll('.project-card.featured').forEach(card => {
                    card.style.gridColumn = 'span 2';
                });
            }
        });
    });
}

/**
 * Project card hover effects
 */
function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const visual = card.querySelector('.card-visual');
        const icon = card.querySelector('.visual-icon');

        if (!visual || !icon) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            icon.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

/**
 * Lazy load project images (for future use)
 */
function initLazyLoading() {
    const images = document.querySelectorAll('.project-image[data-src]');

    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    images.forEach(img => imageObserver.observe(img));
}
