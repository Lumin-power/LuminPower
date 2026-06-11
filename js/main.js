

        // Находим наши элементы на странице
        const logo = document.getElementById('logoTrigger');
        const panel = document.getElementById('mySidePanel');
        const closeBtn = document.getElementById('closeBtn');

        // Когда кликаем на логотип -> добавляем класс 'open' (панель выезжает)
       // Где-то выше ты находишь элементы, например:
// const logo = document.querySelector('.logo');
// const panel = document.querySelector('.panel');

// Оборачиваем в проверку: "ЕСЛИ логотип существует на этой странице, ТО вешаем клик"
if (logo) {
    logo.addEventListener('click', function() {
        panel.classList.add('open');
    });
}

// Сделай то же самое для кнопки закрытия:
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        // твой код закрытия
    });
}

        // --- АВТОМАТИЧЕСКИЙ ПЕРЕВОДЧИК ---
const langSelect = document.querySelector('.lang-select');

if (langSelect) {
    langSelect.addEventListener('change', (event) => {
        const lang = event.target.value; // Получаем 'uk' или 'ru'
        
        // Находим скрытый стандартный селект Google Translate
        const gtSelect = document.querySelector('.goog-te-combo');
        
        if (gtSelect) {
            gtSelect.value = lang;
            // Имитируем клик (изменение), чтобы Google понял, что нужно переводить
            gtSelect.dispatchEvent(new Event('change')); 
        }
    });
}


   // --- КАЛЬКУЛЯТОР СЭС ---
    const calculateBtn = document.getElementById("calculateBtn");

    if (calculateBtn) {
        // Добавляем async, так как будем ждать ответа от сервера
        calculateBtn.addEventListener("click", async (event) => {
            // Предотвращаем перезагрузку, если кнопка находится внутри <form>
            event.preventDefault(); 

            const areaInput = document.getElementById("area").value;
            const area = Number(areaInput);

            if (!area || area <= 0) {
                alert("Будь ласка, введіть коректну площу ділянки або даху");
                return;
            }

            // Меняем текст кнопки, пока ждем ответ от Java
            const originalText = calculateBtn.textContent;
            calculateBtn.disabled = true;
            calculateBtn.textContent = "Йде розрахунок...";

            try {
                // Отправляем запрос на наш микросервис калькулятора (порт 8082)
                const response = await fetch('http://localhost:8080/api/calculator/calculate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ area: area })
                });

                if (!response.ok) {
                    throw new Error("Сервер повернув помилку");
                }

                // Парсим JSON-ответ от Java
                const data = await response.json();

                // Вставляем полученные данные в HTML
                document.getElementById("usableArea").textContent = data.usableArea + " м²";
                document.getElementById("panelCount").textContent = data.panelCount + " шт.";
                document.getElementById("totalPower").textContent = data.totalPower + " кВт";

            } catch (error) {
                console.error("Помилка підключення:", error);
                alert("❌ Не вдалося підключитися до сервера розрахунків. Перевірте, чи запущено Calculator Service.");
            } finally {
                // Возвращаем кнопку в исходное состояние
                calculateBtn.disabled = false;
                calculateBtn.textContent = originalText;
            }
        });
    }

    // --- ОБРОБКА ЛІД-ФОРМИ (CRM) ---
    const leadForm = document.querySelector('.lead-form');

    if (leadForm) {
        leadForm.addEventListener('submit', async (event) => {
            // Зупиняємо стандартну відправку форми (щоб сторінка не перезавантажувалась)
            event.preventDefault();

            // Збираємо дані з інпутів
            const nameInput = document.getElementById('userName').value.trim();
            const phoneInput = document.getElementById('userPhone').value.trim();
            const objectTypeInput = document.getElementById('objectType').value;

            // Знаходимо кнопку та міняємо її стан на час очікування
            const submitBtn = leadForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Відправка...';

            try {
                // Відправляємо POST-запит на наш API Gateway (який перенаправить на 8084)
                const response = await fetch('http://localhost:8080/api/crm/leads', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // Назви полів мають точно збігатися з нашим LeadRequest у Java
                    body: JSON.stringify({
                        name: nameInput,
                        phone: phoneInput,
                        objectType: objectTypeInput
                    })
                });

                // Читаємо відповідь сервера (Java повертає звичайний String)
                const responseText = await response.text();

                if (response.ok) {
                    // Якщо все добре, показуємо повідомлення і очищаємо форму
                    alert('✅ Заявку успішно відправлено! Ми зв\'яжемося з вами найближчим часом.');
                    leadForm.reset();
                } else {
                    alert('❌ Помилка сервера: ' + responseText);
                }

            } catch (error) {
                console.error('Помилка при відправці заявки:', error);
                alert('❌ Не вдалося підключитися до сервера. Перевірте, чи запущено Project Service.');
            } finally {
                // Повертаємо кнопку в початковий стан
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }