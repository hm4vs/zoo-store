// Мок-данные товаров (замените на реальные)
const products = [
    // Корма
    { id: 1, name: "Корм для кошек Premium", price: 1500, category: "food", image: "assets/cat-food.jpg" },
    { id: 2, name: "Корм для собак с говядиной", price: 1800, category: "food", image: "assets/dog-food.jpg" },
    
    // Игрушки
    { id: 3, name: "Интерактивная мышь для кошек", price: 650, category: "toys", image: "assets/cat-toy.jpg" },
    { id: 4, name: "Мяч со свистком для собак", price: 450, category: "toys", image: "assets/dog-ball.jpg" },
    
    // Аксессуары
    { id: 5, name: "Кожаный ошейник", price: 1200, category: "accessories", image: "assets/collar.jpg" },
    { id: 6, name: "Переноска для кошек", price: 3200, category: "accessories", image: "assets/carrier.jpg" },
    
    // Добавьте новые товары
    { id: 7, name: "Лакомства для грызунов", price: 300, category: "food", image: "assets/rodent-treats.jpg" },
    { id: 8, name: "Аквариум 50 литров", price: 4500, category: "accessories", image: "assets/aquarium.jpg" },

    { id: 9, name: "Груминг-щётка", price: 800, category: "accessories", image: "assets/brush.jpg" },
    { id: 10, name: "Птичий корм с витаминами", price: 250, category: "food", image: "assets/bird-food.jpg" }
];

// Загрузка товаров на главную страницу
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Цена: ${product.price} руб.</p>
            <button onclick="addToCart(${product.id})">В корзину</button>
        </div>
    `).join('');
}

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    loadCartItems(); // Обновляем корзину
}

// Обновление счетчика
function updateCartCounter() {
    const counter = document.getElementById('cart-counter');
    counter.textContent = cart.length;
}

// Загрузка корзины
window.loadCartItems = function() {
    const container = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    container.innerHTML = cart.length === 0 ? 
        `<div class="empty-cart"><p>🛒 Корзина пуста</p></div>` : 
        cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="80">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Цена: ${item.price} руб.</p>
                </div>
                <button onclick="removeFromCart(${index})" class="remove-btn">×</button>
            </div>
        `).join('');

    totalPriceElement.textContent = cart.reduce((sum, item) => sum + item.price, 0);
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    updateCartCounter();
});

console.log(localStorage.getItem('cart'));