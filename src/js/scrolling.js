export { scrollingTopPage }

function scrollingTopPage() {
    document.addEventListener('DOMContentLoaded', function () {
        const upButton = document.querySelector('.up-btn');

        // Проверка на существование кнопки
        if (!upButton) return;

        upButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            document.body.classList.add('scrolling');
        });

        window.addEventListener('scroll', function () {
            // Проверка позиции прокрутки для показа кнопки
            if (window.scrollY > 200) {
                upButton.classList.add('show');
            } else {
                upButton.classList.remove('show');
            }

            // Удаление класса 'scrolling', когда достигнуто верхнее положение
            if (document.body.classList.contains('scrolling') && window.scrollY === 0) {
                document.body.classList.remove('scrolling');
            }
        });
    });
}
