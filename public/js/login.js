/* eslint-disable */

const login = (email, password) => {
    alert(email, password);
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = docuemnt.getElementById('email').value;
  const password = docuemnt.getElementById('password').value;
  login(email, password);
});
