document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            this.classList.toggle('liked');
        });
    });
});