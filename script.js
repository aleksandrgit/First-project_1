
const iconMenu = document.querySelector('.header__burger');
const menuBody = document.querySelector('.header__body');
const menuLinks = document.querySelectorAll('.menu__link');
const counters = document.querySelectorAll('.about__me-date-number');

if (iconMenu) {
    iconMenu.addEventListener('click', () => {
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
        });
    });
}


const animateCounter = (el) => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const startTime = performance.now();

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);

        el.textContent = value.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };

    requestAnimationFrame(update);
};

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.about__me-date-number');
                numbers.forEach(num => animateCounter(num));
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.4
    }
);

observer.observe(document.querySelector('.about__me-date'));





