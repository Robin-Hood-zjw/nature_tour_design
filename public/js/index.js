/* eslint-disable */
import { login } from './login';

console.log('hello from the parcel');

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});
