document.addEventListener('DOMContentLoaded', () => {
    
    const leadsContainer = document.getElementById('crmLeadsContainer');
    
    // Если мы не на странице профиля — ничего не делаем
    if (!leadsContainer) return;

    // Функция для загрузки заявок с сервера
    async function fetchLeads() {
        try {
            // Стучимся на наш эндпоинт GET /api/crm/leads через Шлюз
            const response = await fetch('http://localhost:8080/api/crm/leads');
            
            if (!response.ok) {
                throw new Error('Помилка сервера при отриманні заявок');
            }

            const leads = await response.json();
            renderLeads(leads);
            
        } catch (error) {
            console.error('Помилка:', error);
            leadsContainer.innerHTML = '<p style="color: red;">❌ Не вдалося завантажити заявки.</p>';
        }
    }

    // Функция для отрисовки карточек с заявками
    // Функция для отрисовки карточек с заявками
    function renderLeads(leads) {
        leadsContainer.innerHTML = ''; 

        if (leads.length === 0) {
            leadsContainer.innerHTML = '<p style="color: #666;">Нових заявок поки немає.</p>';
            return;
        }

        leads.forEach(lead => {
            const leadCard = document.createElement('div');
            leadCard.className = 'lead-card'; // Привязываем наш новый CSS класс!

            const objectTypeName = lead.objectType === 'business' ? 'Для бізнесу' : 'Приватний будинок';
            const statusClass = lead.status === 'NEW' ? 'new' : ''; 

            leadCard.innerHTML = `
                <h4>👤 ${lead.name}</h4>
                <p><strong>📞 Телефон:</strong> <a href="tel:${lead.phone}" style="color: #2563eb; text-decoration: none;">${lead.phone}</a></p>
                <p><strong>🏠 Об'єкт:</strong> ${objectTypeName}</p>
                <p><strong>📌 Статус:</strong> <span class="status-badge ${statusClass}">${lead.status}</span></p>
                <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
                    🕒 Створено: ${new Date(lead.createdAt).toLocaleString('uk-UA')}
                </div>
            `;
            
            leadsContainer.appendChild(leadCard);
        });
    }

    // Запускаем загрузку сразу при открытии страницы
    fetchLeads();


    // --- ЛОГИКА СКЛАДА ---
    const warehouseContainer = document.getElementById('warehouseContainer');

    async function fetchWarehouse() {
        if (!warehouseContainer) return;
        
        try {
            // Стучимся на склад через Шлюз
            const response = await fetch('http://localhost:8080/api/warehouse/items');
            
            if (!response.ok) {
                throw new Error('Помилка сервера');
            }

            const items = await response.json();
            renderWarehouse(items);
            
        } catch (error) {
            console.error('Помилка:', error);
            warehouseContainer.innerHTML = '<p style="color: red;">❌ Не вдалося завантажити склад.</p>';
        }
    }

    function renderWarehouse(items) {
        warehouseContainer.innerHTML = ''; 

        if (items.length === 0) {
            warehouseContainer.innerHTML = '<p style="color: #666;">Склад порожній.</p>';
            return;
        }

        // Словарь для перевода категорий на понятный язык
        const categoryMap = {
            'INVERTER': 'Інвертор',
            'PANEL': 'Сонячна панель',
            'BATTERY': 'Акумулятор',
            'CABLE': 'Кабель та комплектуючі'
        };

        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'lead-card';
            itemCard.style.borderLeftColor = '#10b981'; // Изумрудно-зеленая полоска для склада

            const categoryName = categoryMap[item.category] || item.category;

            itemCard.innerHTML = `
                <h4 style="margin-bottom: 5px;">📦 ${item.name}</h4>
                <p style="margin: 5px 0;"><strong>Категорія:</strong> ${categoryName}</p>
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
                    <span>Залишок на складі:</span>
                    <span style="font-size: 18px; font-weight: bold; color: #10b981;">${item.quantity} шт.</span>
                </div>
            `;
            
            warehouseContainer.appendChild(itemCard);
        });
    }

    // Запускаем загрузку склада вместе с загрузкой заявок
    fetchWarehouse();
});