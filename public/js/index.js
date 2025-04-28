/* eslint-disable */
import { displayMap } from './mapbox.js';
import { login, logout } from './login.js';
import { updateSettings } from './updateSettings.js';

const target = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password'); 

if (target) {
    const locations = JSON.parse(target.dataset.locations);
    displayMap(locations);
}

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (userDataForm) {
    userDataForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        updateSettings({ name, email }, 'data');
    });
}

if (userPasswordForm) {
    userPasswordForm.addEventListener('submit', e => {
        e.preventDefault();

        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');
    });
}