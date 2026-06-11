document.addEventListener('DOMContentLoaded', () => {
    
    const productsContainer = document.getElementById('productsContainer');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Если мы не на странице магазина — просто выходим
    if (!productsContainer) return;

    // Словарь: связываем текст на кнопках с категориями в базе данных Java
    const categoryMap = {
        'Всі товари': 'ALL',
        'Інвертори': 'INVERTER',
        'Сонячні панелі': 'PANEL',
        'Акумулятори': 'BATTERY'
    };

    // Функция для загрузки товаров с сервера (теперь она принимает URL)
    async function fetchProducts(url = 'http://localhost:8080/api/catalog/products') {
        try {
            productsContainer.innerHTML = '<p style="text-align: center; width: 100%; color: #666;">Завантаження...</p>';
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Помилка сервера');
            }

            const products = await response.json();
            renderProducts(products); 
            
        } catch (error) {
            console.error('Помилка при завантаженні товарів:', error);
            productsContainer.innerHTML = '<p style="text-align: center; color: red; width: 100%;">❌ Не вдалося завантажити товари.</p>';
        }
    }

    // Обработка кликов по кнопкам категорий
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Убираем класс active у всех кнопок и вешаем на ту, по которой кликнули
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 2. Получаем текст кнопки и находим соответствующую категорию для БД
            const categoryName = btn.textContent.trim();
            const backendCategory = categoryMap[categoryName];

            // 3. Делаем правильный запрос через API Gateway
            if (backendCategory === 'ALL') {
                fetchProducts('http://localhost:8080/api/catalog/products');
            } else {
                fetchProducts(`http://localhost:8080/api/catalog/products/category/${backendCategory}`);
            }
        });
    });

    // Функция для отрисовки HTML-карточек
    function renderProducts(products) {
        productsContainer.innerHTML = ''; 

        if (products.length === 0) {
            productsContainer.innerHTML = '<p style="text-align: center; width: 100%; color: #888;">В цій категорії поки немає товарів.</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const formattedPrice = new Intl.NumberFormat('uk-UA').format(product.price);

            card.innerHTML = `
                <div class="product-img" style="background-image: url('${product.imageUrl}');"></div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-price">${formattedPrice} ₴</div>
                    <a href="#" class="btn-outline">Детальніше</a>
                </div>
            `;
            productsContainer.appendChild(card);
        });
    }

    // При первом открытии страницы загружаем все товары
    fetchProducts();
});