/* eslint-disable */
// import '@babel/polyfill';

import { displayMap } from './mapbox.js';
import { login, logout } from './login.js';

const loginForm = document.querySelector('.form--login');

const locations = JSON.parse(document.getElementById('map').dataset.locations);
displayMap(locations);

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
}