const bodyElem = document.body;
const toggleButton = document.querySelector('.mode-toggle');
const toggleButtonIcon = document.querySelector('.mode-toggle img')

toggleButton.addEventListener('click', () => {
    bodyElem.classList.toggle('dark-mode');
    if (bodyElem.classList.contains('dark-mode')) {
        toggleButtonIcon.src = './assets/dark-mode/icon-sun.svg'
    } else {
        toggleButtonIcon.src = './assets/light-mode/icon-moon.svg'
    }
})

// BUGGY
toggleButton.addEventListener('mouseover', () => {
    // Change toggle icon accordingly
    if (bodyElem.classList.contains('dark-mode')) {
        toggleButtonIcon.src = './assets/dark-mode/icon-sun-hover.svg'
    } else {
        toggleButtonIcon.src = './assets/light-mode/icon-moon-hover.svg'
    }
})

toggleButton.addEventListener('mouseout', () => {
    // Change toggle icon accordingly
    if (bodyElem.classList.contains('dark-mode')) {
        toggleButtonIcon.src = './assets/dark-mode/icon-sun.svg'
    } else {
        toggleButtonIcon.src = './assets/light-mode/icon-moon.svg'
    }
})