const form = document.querySelector('form');
const emailErr = document.querySelector('.error.email');
const passwordErr = document.querySelector('.error.password');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    emailErr.textContent = '';
    passwordErr.textContent = '';

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
        const res = await fetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();

        if (data.errors) {
            console.log("Erros recebidos do servidor:", data.errors);
            emailErr.textContent = data.errors.email || '';
            passwordErr.textContent = data.errors.password || '';
        } else if (res.ok && data.user) {
            location.assign('/task');
        }
    } catch (err) {
        console.log("Erro durante a requisição:", err);
    }
});