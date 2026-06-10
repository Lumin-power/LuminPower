

        // Находим наши элементы на странице
        const logo = document.getElementById('logoTrigger');
        const panel = document.getElementById('mySidePanel');
        const closeBtn = document.getElementById('closeBtn');

        // Когда кликаем на логотип -> добавляем класс 'open' (панель выезжает)
        logo.addEventListener('click', function() {
            panel.classList.add('open');
        });

        // Когда кликаем на крестик -> убираем класс 'open' (панель уезжает обратно)
        closeBtn.addEventListener('click', function() {
            panel.classList.remove('open');
        });


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
        calculateBtn.addEventListener("click", () => {
            const areaInput = document.getElementById("area").value;
            const area = Number(areaInput);

            if (!area || area <= 0) {
                alert("Будь ласка, введіть коректну площу ділянки або даху");
                return;
            }

            // Математика расчетов
            const usefulArea = area * 0.95;
            const panelArea = 2.3;
            const panelPower = 0.6; // 600 Вт
            
            const panelCount = Math.floor(usefulArea / panelArea);
            const totalPower = panelCount * panelPower;

            // Вывод данных в HTML
            document.getElementById("usableArea").textContent = usefulArea.toFixed(1) + " м²";
            document.getElementById("panelCount").textContent = panelCount + " шт.";
            document.getElementById("totalPower").textContent = totalPower.toFixed(1) + " кВт";
        });
    }
