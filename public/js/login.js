
const form = document.querySelector('form');
const emailErr = document.querySelector('.email.error');
const passwordErr = document.querySelector('.password.error');

form.addEventListener('submit', async (e) =>{
    e.preventDefault();

    emailErr.textContent = '';
    passwordErr.textContent = '';

    const email = form.email.value;
    const password = form.password.value;

    try{
        const res = await fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {'Content-Type': 'application/json'}
        });

        const data = await res.json();

        if(data.errors){
            emailErr.textContent = data.errors.email;
            passwordErr.textContent = data.errors.password;
        }

        if(data.user){
            location.assign('/');
        }

    }
    catch(err){
        console.log(err);
    }
});
