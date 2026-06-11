// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.getElementById('loginForm');
    
//     loginForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const email = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         try {
//             const response = await fetch('http://localhost:8080/api/auth/login', {
//                 method: 'POST',
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify({ email, password })
//             });

//             if (response.ok) {
//                 const token = await response.text();
//                 localStorage.setItem('token', token);
//                 window.location.href = 'profile.html'; // Переходим в профиль
//             } else {
//                 alert("Ошибка: неверный логин или пароль");
//             }
//         } catch (err) {
//             alert("Сервер не отвечает");
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const token = await response.text();
                console.log("Токен, который пришел с сервера:", token);
                localStorage.setItem('token', token);
                window.location.href = 'profile.html'; // Успех!
            } else {
                alert("Ошибка: неверный логин или пароль");
            }
        } catch (err) {
            alert("Сервер не отвечает");
        }
    });
});