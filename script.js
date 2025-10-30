document.addEventListener('DOMContentLoaded', () => {
    /* -----------------------------------
       1. Smooth Scroll for Navigation Links
    ----------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId && targetId.length > 1) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    /* -----------------------------------
       2. Scroll-Reveal (Fade-In) Effect
    ----------------------------------- */
    const fadeSections = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    fadeSections.forEach(section => fadeObserver.observe(section));

    /* -----------------------------------
       3. Skill / Progress Bar Animation
    ----------------------------------- */
    const skillSection = document.getElementById('skills');
    if (skillSection) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = skillSection.querySelectorAll('.progress-bar');
                    bars.forEach(bar => {
                        const target = parseInt(bar.getAttribute('aria-valuenow'), 10) || 0;
                        let width = 0;

                        const animate = () => {
                            if (width < target) {
                                width++;
                                bar.style.width = width + '%';
                                bar.textContent = width + '%'; // Optional: show inside the bar
                                requestAnimationFrame(animate);
                            }
                        };
                        animate();
                    });
                    observer.unobserve(skillSection);
                }
            });
        }, { threshold: 0.5 });

        skillObserver.observe(skillSection);
    }
});
