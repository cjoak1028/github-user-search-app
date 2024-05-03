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

const searchInputEl = document.getElementById('search-input');
const searchWarningEl = document.getElementById('search-warning');
const searchButton = document.getElementById('search-button');

function init() {
    fetchUserAndRender('octocat');
    themeToggler.addEventListener('click', switchTheme);
    detectColorScheme();
}

//Determines if the user has a set theme
function detectColorScheme() {
    var theme = "light";    //default to light

    //local storage is used to override OS theme settings
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "dark") {
            var theme = "dark";
        }
    } else if (!window.matchMedia) {
        //matchMedia method not supported
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        var theme = "dark";
    }

    //set body with data-theme attribute
    if (theme == "dark") {
        document.body.setAttribute("data-theme", "dark");
        togglerLabel.innerText = "Light";

    } else {
        document.body.setAttribute("data-theme", "light");
        togglerLabel.innerText = "Dark";
    }
}

// Function that updates styles of elements when theme is toggled
function switchTheme() {
    let currentTheme = document.body.dataset.theme;
    if (currentTheme === "dark") {
        localStorage.setItem('theme', 'light');
        document.body.setAttribute("data-theme", "light");
        togglerLabel.innerText = "Dark";
    } else {
        localStorage.setItem('theme', 'dark');
        document.body.setAttribute("data-theme", "dark");
        togglerLabel.innerText = "Light";
    }
}

// Handles search when username is submitted
async function submitForm(e) {
    e.preventDefault();
    const searchInputValue = searchInputEl.value.trim();

    if (searchInputValue === "") {
        return;
    }

    fetchUserAndRender(searchInputValue);
}

// Fetches user and renders info
async function fetchUserAndRender(username) {
    const user = await fetchUser(username);

    if (user) {
        searchWarningEl.classList.add('hidden');
        renderUserInfo(user);
    } else {
        searchWarningEl.classList.remove('hidden');
    }
}

// Fetches user based on username
async function fetchUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const user = await response.json();
        if (response.ok) {
            return user;
        }
    } catch (error) {
        console.error(error);
    }
}

// Render user information on the UI
function renderUserInfo(user) {
    renderUserDetails(user);
    renderUserLinks(user);
}

// Extract and render user details
function renderUserDetails(user) {
    const { name, login, created_at, bio, avatar_url } = user;

    renderProfileImages(avatar_url);
    renderUserName(name, login);
    renderUserLogin(login);
    renderUserBio(bio);
    renderUserDateJoined(created_at)
}

// Renders user name or login when name is unavailable
function renderUserName(name, login) {
    userNameEl.innerText = name || login;
}

// Renders user login
function renderUserLogin(login) {
    userLoginEl.innerText = login;
}

// Renders user bio
function renderUserBio(bio) {
    userBioEl.innerText = bio ? bio : "This profile has no bio";
    userBioEl.classList.toggle("disabled", !bio);
}

function renderProfileImages(image_url) {
    for (let image of profileImageList) {
        image.setAttribute('src', image_url);
    }
}

// Render user date joined
function renderUserDateJoined(date_joined) {
    const formattedDate = formatDate(date_joined);
    userDateJoinedEl.innerText = formattedDate;
}

// Converts date format
function formatDate(date_str) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const [year, month, day] = date_str.split('T')[0].split('-');
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
    userLocationEl.innerText = location?.split(',')[0] ?? "Not Available";
    userLocationEl.parentElement.classList.toggle('disabled', !location);
}

// Render user company
function renderUserCompany(company) {
    const formattedCompany = company ? `https://github.com/${company.substr(1)}` : "";
    userCompanyEl.setAttribute('href', formattedCompany);
    userCompanyEl.innerText = company || "Not Available";
    userCompanyEl.parentElement.classList.toggle('disabled', !company);
}

// Render user twitter
function renderUserTwitter(username) {
    userTwitterEl.setAttribute('href', username ? `https://twitter.com/${username}` : "");
    userTwitterEl.innerText = username || "Not Available";
    userTwitterEl.parentElement.classList.toggle('disabled', !username);
}

// Render user blog
function renderUserBlog(blog) {
    userBlogEl.setAttribute('href', blog ? `https://${blog}` : "");
    userBlogEl.innerText = blog || "Not Available";
    userBlogEl.parentElement.classList.toggle('disabled', !blog);
}

init();