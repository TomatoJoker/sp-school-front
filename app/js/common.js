const desktopMedia = getComputedStyle(document.documentElement).getPropertyValue('--desktop');

dynamicHeightToolbar()
window.addEventListener("resize", function () {
    dynamicHeightToolbar();
});

function dynamicHeightToolbar() {
    if (window.innerWidth < desktopMedia) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    } else {
        document.documentElement.style.removeProperty('--vh');
    }
} // calc window height without toolbar on mobile browser


const dropdown = (btnEl, parent, element) => {
    const btn = document.querySelectorAll(btnEl);
    btn.forEach(el => {
        el.addEventListener('click', () => {
            const modal = el.closest(parent).querySelector(element);
            const isMenuOpen = el.getAttribute('aria-expanded') === 'true' || false;
            const body = document.querySelector('body');
            const bodyStyle = body.style.getPropertyValue('overflow');

            if (el.getAttribute('aria-expanded')) {
                el.setAttribute('aria-expanded', !isMenuOpen);
            }

            if (el.getAttribute('aria-controls') === 'dataNav') {
                if (!bodyStyle) {
                    body.style.setProperty('overflow', 'hidden');
                } else {
                    body.style.removeProperty('overflow');
                }
            }


            el.classList.toggle('is-active');
            modal.classList.toggle('is-open');
        });
    })
}

dropdown('.js-dropdown-btn', '.js-dropdown-wrapper', '.js-dropdown-block');
dropdown('lang-dropdown-btn', '.lang-dropdown', '.lang-dropdown-content');

