/**
 * Resume page specific JavaScript
 * Handles tabs, timeline, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    initResumeTabs();
    initTimelineScroll();
    initPrintAndDownload();
});

/**
 * Resume tab navigation
 */
function initResumeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.resume-section');

    if (!tabButtons.length || !sections.length) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Update button states
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetTab || section.id === targetTab + '-section') {
                    section.classList.add('active');
                }
            });

            // Trigger animations for newly visible elements
            const activeSection = document.querySelector('.resume-section.active');
            if (activeSection) {
                triggerSectionAnimations(activeSection);
            }
        });
    });
}

/**
 * Trigger animations for elements in a section
 */
function triggerSectionAnimations(section) {
    // Animate skill bars
    const skillBars = section.querySelectorAll('.bar-fill');
    skillBars.forEach((bar, index) => {
        bar.style.animation = 'none';
        bar.offsetHeight; // Trigger reflow
        bar.style.animation = `fillBar 1s ease-out ${index * 0.1}s forwards`;
    });

    // Animate entry cards
    const cards = section.querySelectorAll('.entry-card, .skill-detail-card, .experience-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

/**
 * Timeline scroll progress
 */
function initTimelineScroll() {
    const timeline = document.querySelector('.interactive-timeline');
    const progress = document.querySelector('.timeline-progress');

    if (!timeline || !progress) return;

    const updateProgress = () => {
        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the timeline is visible/scrolled
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;

        // Start progress when timeline enters viewport
        if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
            const scrolledInto = Math.max(0, windowHeight - timelineTop);
            const totalScrollable = windowHeight + timelineHeight;
            const progressPercent = Math.min(100, (scrolledInto / totalScrollable) * 100);

            progress.style.height = progressPercent + '%';
        }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
}

/**
 * Print and Download functionality
 */
function initPrintAndDownload() {
    const printBtn = document.getElementById('print-resume');
    const downloadBtn = document.getElementById('download-resume');

    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Create a simple text version for download
            // In production, you'd link to an actual PDF
            alert('PDF download coming soon! For now, please use the Print button and save as PDF.');
        });
    }
}

/**
 * Animate language dots
 */
function animateLanguageDots() {
    const languageItems = document.querySelectorAll('.language-item');

    languageItems.forEach((item, index) => {
        const dots = item.querySelectorAll('.dot.filled');
        dots.forEach((dot, dotIndex) => {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0)';
            setTimeout(() => {
                dot.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                dot.style.opacity = '1';
                dot.style.transform = 'scale(1)';
            }, (index * 100) + (dotIndex * 50));
        });
    });
}

// Trigger language animation when skills tab is shown
document.addEventListener('DOMContentLoaded', () => {
    const skillsTab = document.querySelector('[data-tab="skills"]');
    if (skillsTab) {
        skillsTab.addEventListener('click', () => {
            setTimeout(animateLanguageDots, 300);
        });
    }
});
