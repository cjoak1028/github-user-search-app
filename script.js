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

// Fetches user based on username and updates DOM
async function fetchUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const user = await response.json();
        console.log(user);
    } catch (error) {
        console.error(error);
    }
}

themeToggler.addEventListener('click', toggleTheme);

fetchUser('octocat');