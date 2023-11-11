const loginForm = document.getElementById('loginForm');

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
        
        console.log(response.message);
         
    }catch(err){
        console.log(Json.stringify(err))
        document.body.innerHTML += `<div style="color:red">${err.message}<div>`;
    }
            
}

loginForm.addEventListener('submit' , login);
