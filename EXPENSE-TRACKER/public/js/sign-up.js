const signUpForm = document.getElementById('signupForm');

function signup(e) {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;



    const userData = {
        name: name,
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

signUpForm.addEventListener('submit' , signup);
