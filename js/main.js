

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
