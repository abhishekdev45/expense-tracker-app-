const signUpForm = document.getElementById('signupForm');

const forgotPasswordBtn = document.getElementById('forgotPasswordLink');

forgotPasswordBtn.addEventListener('click', function() {
    document.getElementById('forgotPasswordForm').style.display = 'block';
});

const  forgotPasswordForm = document.getElementById('forgotPasswordForm');

forgotPasswordForm.addEventListener('submit' , async () => {
    try{
        const email = document.getElementById('forgotEmail').value;
        const result = await axios.post('http://localhost:3000/user/forgotpassword' , {email})
        document.body.innerHTML += `<p>${result.message}</p>`;
    }
    catch(err){
        document.body.innerHTML += `<div style ="color:red;">${err.message}</div>`;
    }
})

async function signup(e) {
    e.preventDefault();
    try{
        const name = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
    
    
        const userData = {
            name: name,
            email: email,
            password: password
        };
    
        const response = await axios.post('http://localhost:3000/user/sign-up', userData);
            if(response.status === 201){
                window.location.href = "../../views/login.html"
            } else {
                throw new Error('Failed to login')
            }

     
    }catch(err){
        document.body.innerHTML += `<div style ="color:red;">${err.message}<div>`;
            
    }
}

signUpForm.addEventListener('submit' , signup);
