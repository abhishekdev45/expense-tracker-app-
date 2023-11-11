const loginForm = document.getElementById('loginForm');

function login(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;



    const userData = {
        email: email,
        password: password
    };

    axios.post('http://localhost:3000/user/sign-up', userData)
        .then(response => {
            console.log('Signup successful!');
        })
        .catch(err => {
            console.log(err);
            document.body.innerHTML += `<p>Error: ${err.message}</p>`;
            
        });
}

loginForm.addEventListener('submit' , login);
