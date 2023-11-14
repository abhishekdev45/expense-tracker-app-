const signUpForm = document.getElementById('signupForm');

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
                window.location.href = "./login.html"
            } else {
                throw new Error('Failed to login')
            }

     
    }catch(err){
        document.body.innerHTML += `<div style ="color:red;">${err.message}<div>`;
            
    }
}

signUpForm.addEventListener('submit' , signup);
