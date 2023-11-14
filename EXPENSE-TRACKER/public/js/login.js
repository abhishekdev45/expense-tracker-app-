const loginForm = document.getElementById('loginForm');

function forgotpassword() {
    window.location.href = "../../views/forgotPassword.html"
}

async function login(e) {
    e.preventDefault();
    try{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginDetails = {
        email: email,
        password: password
    };

    const response = await axios.post('http://localhost:3000/user/login', loginDetails)
        alert(response.data.message);
        localStorage.setItem('token' , response.data.token)

    }catch(err){
        console.log(err.message);
        document.body.innerHTML += `<div style="color:red">${err.message}<div>`;
    }
            
}

loginForm.addEventListener('submit' , login);
