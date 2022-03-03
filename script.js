'use strict';

var token = config.MY_API_TOKEN;

import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
const octokit = new Octokit({ auth: token });

const bodyElem = document.body;
const toggleButton = document.querySelector('.mode-toggle');
const toggleButtonLabel = document.querySelector('.mode-toggle__title');
const searchForm = document.querySelector('.form-group');
const searchInput = document.querySelector('.form-control');

const getUserData = async (username) => {
    const userData = await octokit.request('GET /users/{username}', {
        username: username
    });

    return userData;
}

const updateProfile = (data) => {
    console.log(data);
}

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

    getUserData(searchInput.value)
        .then((user) => {
            updateProfile(user.data);
        })
        .catch((err) => {
            console.error(err);
        });
});