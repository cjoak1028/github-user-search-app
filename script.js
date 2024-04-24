const themeToggler = document.getElementById('theme-toggler');

// Function that updates styles of elements when theme is toggled
function toggleTheme() {
    const body = document.body;
    const togglerLabel = document.getElementById('theme-label');

    // Toggle theme class
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');

    // Change theme toggler button based on selected theme
    togglerLabel.textContent = body.classList.contains('light-theme') ? 'Dark' : 'Light';
}

themeToggler.addEventListener('click', toggleTheme);