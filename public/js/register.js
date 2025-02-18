const form = document.querySelector('form');
const emailErr = document.querySelector('.email.error');
const passwordErr = document.querySelector('.password.error');

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

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();

        if (data.errors) {
            emailErr.textContent = data.errors.email || '';
            passwordErr.textContent = data.errors.password || '';
        }

        if (data.user) {
            location.assign('/task');
            console.log(data);
        }
    }
    catch (err) {
        console.log(err);
    }
});
