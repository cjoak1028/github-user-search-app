const themeToggler = document.getElementById('theme-toggler');
const togglerLabel = document.getElementById('theme-label');

const userNameEl = document.getElementById('user-name');
const userLoginEl = document.getElementById('user-login');
const userBioEl = document.getElementById('user-bio');
const reposCountEl = document.getElementById('repos-count');
const followersCountEl = document.getElementById('followers-count');
const followingCountEl = document.getElementById('following-count');
const userLocationEl = document.getElementById('user-location');
const userBlogEl = document.getElementById('user-blog');
const userTwitterEl = document.getElementById('user-twitter');
const userCompanyEl = document.getElementById('user-company');
const profileImageList = document.getElementsByClassName('profile-image');
const userLocationContainer = document.getElementById('user-location-container');
const userBlogContainer = document.getElementById('user-blog-container');
const userTwitterContainer = document.getElementById('user-twitter-container');
const userCompanyContainer = document.getElementById('user-company-container');

// Function that updates styles of elements when theme is toggled
function toggleTheme() {
    // Toggle theme class
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    // Change theme toggler button based on selected theme
    togglerLabel.textContent = document.body.classList.contains('light-theme') ? 'Dark' : 'Light';
}

// Render user information on the UI
function renderUserInfo(user) {
    renderUserDetails(user);
    renderUserSocialLinks(user);
}

// Extract and render user details
function renderUserDetails(user) {
    const { name, login, bio, avatar_url, location, company } = user;

    userNameEl.innerText = name || login;
    userLoginEl.innerText = login;
    userBioEl.innerText = bio || "This profile has no bio";
    for (let image of profileImageList) {
        image.setAttribute('src', avatar_url);
    }
    renderUserLocation(location);
    renderUserCompany(company);
}

// Extract and render social links
function renderUserSocialLinks(user) {
    const { blog, twitter_username } = user;

    renderSocialLink(userBlogEl, blog, "https://", "Not Available");
    renderSocialLink(userTwitterEl, twitter_username, "https://twitter.com/", "Not Available");
}

// Set social link attributes and text
function renderSocialLink(element, link, prefix, fallbackText) {
    if (link) {
        element.setAttribute('href', `${prefix}${link}`);
        element.innerText = link;
        element.parentElement.classList.remove('not-available');
    } else {
        element.setAttribute('href', "");
        element.innerText = fallbackText;
        element.parentElement.classList.add('not-available');
    }
}

// Render user location
function renderUserLocation(location) {
    userLocationEl.innerText = location ? location.split(',')[0] : "Not Available";
    toggleContainerOpacity(userLocationContainer, location);
}

// Render user company
function renderUserCompany(company) {
    const formattedCompany = company ? `https://github.com/${company.substr(1)}` : "";
    userCompanyEl.setAttribute('href', formattedCompany);
    userCompanyEl.innerText = company || "Not Available";
    toggleContainerOpacity(userCompanyContainer, company);
}

// Handle opacity of link containers
function toggleContainerOpacity(container, condition) {
    if (condition) {
        container.classList.remove('not-available');
    } else {
        container.classList.add('not-available');
    }
}

// Fetches user based on username and updates DOM
async function fetchUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const user = await response.json();
        renderUserInfo(user);
    } catch (error) {
        console.error(error);
    }
}

themeToggler.addEventListener('click', toggleTheme);

fetchUser('hello');