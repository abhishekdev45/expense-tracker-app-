const loginForm = document.getElementById('loginForm');

const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

forgotPasswordBtn.addEventListener('click', function() {
    document.getElementById('forgotPasswordForm').style.display = 'block';
});

const  forgotPasswordForm = document.getElementById('forgotPasswordForm');

forgotPasswordForm.addEventListener('submit' , async () => {
    try{
        const email = document.getElementById('forgotEmail').value;
        const result = await axios.post('http://localhost:3000/password/forgotpassword' , {email})
        document.body.innerHTML += `<p>${result.message}</p>`;
    }
    catch(err){
        document.body.innerHTML += `<div style ="color:red;">${err.message}</div>`;
    }
})

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
