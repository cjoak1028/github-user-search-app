const themeToggler = document.getElementById('theme-toggler');
const togglerLabel = document.getElementById('theme-label');

const userNameEl = document.getElementById('user-name');
const userLoginEl = document.getElementById('user-login');
const userDateJoinedEl = document.getElementById('user-date-joined')
const userBioEl = document.getElementById('user-bio');
const reposCountEl = document.getElementById('repos-count');
const followersCountEl = document.getElementById('followers-count');
const followingCountEl = document.getElementById('following-count');
const userLocationEl = document.getElementById('user-location');
const userBlogEl = document.getElementById('user-blog');
const userTwitterEl = document.getElementById('user-twitter');
const userCompanyEl = document.getElementById('user-company');
const profileImageList = document.getElementsByClassName('profile-image');

// Function that updates styles of elements when theme is toggled
function toggleTheme() {
    // Toggle theme class
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    // Change theme toggler button based on selected theme
    togglerLabel.textContent = document.body.classList.contains('light-theme') ? 'Dark' : 'Light';
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

// Render user information on the UI
function renderUserInfo(user) {
    renderUserDetails(user);
    renderUserLinks(user);
    console.log(user);
}

// Extract and render user details
function renderUserDetails(user) {
    const { name, login, created_at, bio, avatar_url } = user;

    userNameEl.innerText = name || login;
    userLoginEl.innerText = login;
    userBioEl.innerText = bio || "This profile has no bio";
    for (let image of profileImageList) {
        image.setAttribute('src', avatar_url);
    }
    renderUserDateJoined(created_at)
}

// Render user date joined
function renderUserDateJoined(dateJoined) {
    const formattedDate = formatDate(dateJoined);
    userDateJoinedEl.innerText = formattedDate;
}

// Converts date format
function formatDate(dateString) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const [year, month, day] = dateString.split('T')[0].split('-');
    const monthAbbreviation = months[parseInt(month, 10) - 1];

    return `${parseInt(day, 10)} ${monthAbbreviation} ${year}`;
}

// Extract and render social links
function renderUserLinks(user) {
    const { location, company, blog, twitter_username } = user;

    renderUserLocation(location);
    renderUserCompany(company);
    renderUserBlog(blog);
    renderUserTwitter(twitter_username);
}

// Render user location
function renderUserLocation(location) {
    userLocationEl.innerText = location ? location.split(',')[0] : "Not Available";
    location ? userLocationEl.parentElement.classList.remove('not-available') : userLocationEl.parentElement.classList.add('not-available');
}

// Render user company
function renderUserCompany(company) {
    const formattedCompany = company ? `https://github.com/${company.substr(1)}` : "";
    userCompanyEl.setAttribute('href', formattedCompany);
    userCompanyEl.innerText = company || "Not Available";

    company ? userCompanyEl.parentElement.classList.remove('not-available') : userCompanyEl.parentElement.classList.add('not-available');
}

// Render user twitter
function renderUserTwitter(username) {
    if (username) {
        userTwitterEl.setAttribute('href', `https://twitter.com/${username}`);
        userTwitterEl.innerText = username;
        userTwitterEl.parentElement.classList.remove('not-available');
    } else {
        userTwitterEl.setAttribute('href', "");
        userTwitterEl.innerText = "Not Available";
        userTwitterEl.parentElement.classList.add('not-available');
    }
}

// Render user blog
function renderUserBlog(blog) {
    if (blog) {
        userBlogEl.setAttribute('href', `https://${blog}`);
        userBlogEl.innerText = blog;
        userBlogEl.parentElement.classList.remove('not-available');
    } else {
        userBlogEl.setAttribute('href', "");
        userBlogEl.innerText = "Not Available";
        userBlogEl.parentElement.classList.add('not-available');
    }
}

themeToggler.addEventListener('click', toggleTheme);

fetchUser('stripe');