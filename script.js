const themeToggler = document.querySelector('.theme-toggler');

// Function that updates styles of elements when theme is toggled
function toggleTheme() {
    const togglerLabel = this.querySelector('#theme-label');
    const body = document.body;

    // Toggle theme class
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');

    // Change theme toggler button based on selected theme
    togglerLabel.textContent = body.classList.contains('light-theme') ? 'Dark' : 'Light';
}

themeToggler.addEventListener('click', toggleTheme);