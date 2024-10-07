

// Отримуємо дані про товари з JSON файлу
async function getProducts() {
    let response = await fetch("store_db.json");
    let products = await response.json();
    return products;
};

// Генеруємо HTML-код для карточки товару
function getCardHTML(product) {
    // Створюємо JSON-строку з даними про товар і зберігаємо її в data-атрибуті
    let productData = JSON.stringify(product)

    return `
        <div class="my-card" style="">
            <img src="${product.image}">
            <h5 class="card-title">${product.title}</h5>
            <p class="description-card">
            ${product.description}
            </p>
            <h6>Размер:  ${product.scale} см</h6>
            <p class="cashback"> Кешбек від 5%</p>
            <p class="price-card">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-currency-hryvnia"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a2.64 2.64 0 0 1 2.562 -2h3.376a2.64 2.64 0 0 1 2.562 2a2.57 2.57 0 0 1 -1.344 2.922l-5.876 2.938a3.338 3.338 0 0 0 -1.78 3.64a3.11 3.11 0 0 0 3.05 2.5h2.888a2.64 2.64 0 0 0 2.562 -2" /><path d="M6 10h12" /><path d="M6 14h12" /></svg>
            ${product.price}
           </p>
            <button type="button" class="cart-btn" data-product='${productData}'>
            <svg class="bell" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
            Купити</button>
        </div>
    `;
}

// Відображаємо товари на сторінці
getProducts().then(function (products) {
    let productsList = document.querySelector('.products-list')
    if (productsList) {
        products.forEach(function (product) {
            productsList.innerHTML += getCardHTML(product)
        })
    }

    // Отримуємо всі кнопки "Купити" на сторінці
    let buyButtons = document.querySelectorAll('.products-list .cart-btn');
    // Навішуємо обробник подій на кожну кнопку "Купити"
    if (buyButtons) {
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });
    }
})

