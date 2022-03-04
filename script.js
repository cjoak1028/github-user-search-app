'use strict';

import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
const octokit = new Octokit({ auth: config.MY_API_TOKEN });

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const bodyElem = document.body;
const toggleButton = document.querySelector('.mode-toggle');
const toggleButtonLabel = document.querySelector('.mode-toggle__title');
const searchForm = document.querySelector('.form-group');
const searchInput = document.querySelector('.form-control');

const userPhoto = document.querySelector('.user-profile__photo img');
const userName = document.querySelector('.user-name');
const userId = document.querySelector('.user-id');
const dateJoined = document.querySelector('.user-date-joined');

const userBio = document.querySelector('.user-bio');

const repos = document.querySelector('.repos .stat-data');
const followers = document.querySelector('.followers .stat-data');
const following = document.querySelector('.following .stat-data');

const location = document.querySelector('.location');
const website = document.querySelector('.website');
const twitter = document.querySelector('.twitter');
const company = document.querySelector('.company');

const warning = document.querySelector('.warning');

const displayError = () => {
    warning.style.display = "block";
}

const hideError = () => {
    warning.style.display = "none";
}

const getUserData = async (username) => {
    const userData = await octokit.request('GET /users/{username}', {
        username: username
    });

    return userData;
}

const updateProfile = (data) => {
    console.log(data);
    userPhoto.src = data.avatar_url;
    userName.innerHTML = data.name || data.login;
    userId.innerHTML = `@${data.login}`;

    const day = data.created_at.substring(8, 10);
    const month = MONTHS[parseInt(data.created_at.substring(5, 7)) - 1];
    const year = data.created_at.substring(0, 4);

    dateJoined.querySelector('.day').innerHTML = day;
    dateJoined.querySelector('.month').innerHTML = month;
    dateJoined.querySelector('.year').innerHTML = year;

    if (!data.bio) {
        userBio.innerHTML = 'This profile has no bio';
        userBio.classList.add('not-available');
    } else {
        userBio.innerHTML = data.bio;
        userBio.classList.remove('not-available');
    }

    repos.innerHTML = data.public_repos;
    followers.innerHTML = data.followers;
    following.innerHTML = data.following;

    if (!data.location) {
        location.classList.add('not-available');
        location.querySelector('p').innerHTML = 'Not Available';
    } else {
        location.classList.remove('not-available');
        location.querySelector('p').innerHTML = data.location;
    }

    if (!data.blog) {
        website.classList.add('not-available');
        website.querySelector('p').innerHTML = 'Not Available';
    } else {
        website.classList.remove('not-available');
        website.querySelector('p').innerHTML = data.blog;
    }

    if (!data.twitter_username) {
        twitter.classList.add('not-available');
        twitter.querySelector('p').innerHTML = 'Not Available';
    } else {
        twitter.classList.remove('not-available');
        twitter.querySelector('p').innerHTML = data.twitter_username;
    }

    if (!data.company) {
        company.classList.add('not-available');
        company.querySelector('p').innerHTML = 'Not Available';
    } else {
        company.classList.remove('not-available');
        company.querySelector('p').innerHTML = data.company;
    }
}

searchInput.addEventListener('input', () => {
    console.log('input changed');
    hideError();
})

toggleButton.addEventListener('click', () => {
    bodyElem.classList.toggle('dark-mode');
    if (bodyElem.classList.contains('dark-mode')) {
        toggleButtonLabel.innerHTML = 'light';
    } else {
        toggleButtonLabel.innerHTML = 'dark';
    }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('search button clicked!');
    if (!searchInput.value) {
        return;
    }

    // PLACE IN SEPARATE FUNCTION
    getUserData(searchInput.value)
        .then((user) => {
            updateProfile(user.data);
        })
        .catch((err) => {
            console.error(err);
            displayError();
        });
});

const init = () => {
    // PLACE IN SEPARATE FUNCTION
    getUserData('octocat')
        .then((user) => {
            updateProfile(user.data);
        })
        .catch((err) => {
            console.error(err);
        });
}

init();