const themeToggler = document.querySelector('.theme-toggler');

// Function that updates styles of elements when theme is toggled
function toggleTheme() {
    const togglerLabel = this.querySelector('.theme-toggler__label');
    const togglerIcon = this.querySelector('.theme-toggler__icon');
    const body = document.body;
    const icons = document.querySelectorAll('.icon');

    // Toggle theme class
    body.classList.toggle('theme-light');
    body.classList.toggle('theme-dark');

    // Change theme toggler button based on selected theme
    togglerLabel.textContent = body.classList.contains('theme-light') ? 'Dark' : 'Light';
    togglerIcon.setAttribute('src', body.classList.contains('theme-light') ? './assets/icon-moon.svg' : './assets/icon-sun.svg');

    // Change icon colours based on selected theme
    icons.forEach((icon) => {
        let imgSrc = icon.getAttribute('src');
        let newImgSrc = body.classList.contains('theme-light')
            ? imgSrc.replace('-white.svg', '.svg')
            : imgSrc.replace('.svg', '-white.svg');

        icon.setAttribute('src', newImgSrc);
    });
}

themeToggler.addEventListener('click', toggleTheme);