

function signup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // You should perform client-side validation here before making the API call

    const userData = {
        username: username,
        email: email,
        password: password
    };

    // Assuming the API endpoint is 'https://api.example.com/signup'
    axios.post('http://localhost:3000/user/sign-up', userData)
        .then(response => {
            console.log('Signup successful!', response.data);
            // You can redirect the user or perform other actions here
        })
        .catch(error => {
            console.error('Error signing up:', error.response.data);
            // Handle error, show appropriate message to the user
        });
}
