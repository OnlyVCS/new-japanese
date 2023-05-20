function verifyAnswer() {
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('form');
        const message = document.getElementById('message');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            await fetch('/submit', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        message.innerHTML = 'CORRECT!';
                    } else {
                        message.innerHTML = 'WRONG...';
                    }
                    setTimeout(() => {
                            location.reload();
                    }, 1000);
                })
                .catch(err => {
                    console.error('Something went wrong: ' + err);
                    message.innerHTML = "Error while trying to verify..."
                })
        })
    })
}