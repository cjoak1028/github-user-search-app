const bodyElem = document.body;
const toggleButton = document.querySelector('.mode-toggle');
const toggleButtonLabel = document.querySelector('.mode-toggle__title')

toggleButton.addEventListener('click', () => {
    bodyElem.classList.toggle('dark-mode');
    if (bodyElem.classList.contains('dark-mode')) {
        toggleButtonLabel.innerHTML = 'light';
    } else {
        toggleButtonLabel.innerHTML = 'dark';
    }
})