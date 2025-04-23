/* eslint-disable */
import { displayMap } from './mapbox.js';
import { login, logout } from './login.js';

const target = document.getElementById('map');
const loginForm = document.querySelector('.form--login');

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