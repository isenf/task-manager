document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.querySelectorAll('.task-status');

    statusElement.forEach(element => {
        const status = element.textContent.trim();


        switch (status) {
            case 'pending':
                element.classList.add('status-pending');
                break;
            case 'in progress':
                element.classList.add('status-in-progress');
                break;
            case 'completed':
                element.classList.add('status-completed');
                break

        }
    });
});