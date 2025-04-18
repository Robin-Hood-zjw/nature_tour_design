/* eslint-disable */
import '@babel/polyfill';

import { displayMap } from './mapbox';
import { login, logout } from './login';

// console.log('hello from the parcel');

// const login = async (email, password) => {
//     try {
//         const res = await axios({
//             method: 'POST',
//             url: 'http://127.0.0.1:3000/api/v1/users/login',
//             data: { email, password }
//         });
        
//         if (res.data.status === 'success') {
//             alert('Logged in successfully.')
//             window.setTimeout(() => location.assign('/'), 1500);
//         }
//     } catch (err) {
//         alert(err);
//     }
// };

// const logout = async () => {
//     try {
//         const res = await axios({
//             method: 'GET',
//             url: 'http://127.0.0.1:3000/api/v1/users/logout'
//         });

//         if ((res.data.status = 'success')) location.reload(true);
//     } catch (err) {
//         alert(err.response.data.message);
//     }
// };

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