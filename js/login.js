// Ждем, пока вся страница загрузится
document.addEventListener('DOMContentLoaded', () => {
    
    // Находим элементы управления
    const loginForm = document.getElementById('loginForm');
    const errorDiv = document.getElementById('errorMessage');
    const submitBtn = document.getElementById('submitBtn');
    const emailInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Прячем ошибку, если пользователь начинает вводить текст заново
    emailInput.addEventListener('input', () => errorDiv.style.display = 'none');
    passwordInput.addEventListener('input', () => errorDiv.style.display = 'none');

    // Обрабатываем нажатие на кнопку "Увійти"
    loginForm.addEventListener('submit', async function(event) {
        // Останавливаем стандартную перезагрузку страницы
        event.preventDefault(); 

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Меняем внешний вид кнопки на время загрузки
        submitBtn.disabled = true;
        submitBtn.textContent = 'Перевірка...';
        errorDiv.style.display = 'none';

        try {
            // Отправляем реальный запрос на наш Java-сервер (Auth Service)
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            // Читаем ответ от Java (там мы возвращали String)
            const resultText = await response.text();

            // Проверяем, что ответил сервер
            if (resultText.includes("Ошибка:")) {
                // Если Java вернула текст с ошибкой (неверный пароль или email)
                showError(resultText);
            } else if (resultText.includes("Успех")) {
                // Если логин прошел успешно — перенаправляем в личный кабинет!
                window.location.href = 'profile.html';
            } else {
                // Непредвиденный ответ
                showError("Сталася невідома помилка. Спробуйте пізніше.");
            }

        } catch (error) {
            // Если сервер вообще выключен или нет интернета
            console.error("Помилка підключення до сервера:", error);
            showError("Немає зв'язку з сервером. Перевірте, чи запущено backend.");
        } finally {
            // В любом случае возвращаем кнопку в исходное состояние
            submitBtn.disabled = false;
            submitBtn.textContent = 'Увійти';
        }
    });

    // Вспомогательная функция для показа ошибок
    function showError(message) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = message;
    }
});