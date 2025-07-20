import { fetchProducts } from "./api/apiService";
import { createProductCard } from "./components/cards/create-product-card";
import { createProductStateManager } from "./components/cards/create-product-manager";
import { createCart, handleToggleCart } from "./components/cart/cart";
import { initSortDropdown } from "./components/custom-select/custom-select";
import { handleToggleFilter } from "./components/filterSort/filterSort";
import { handlerMenu } from './components/menu/menu';
import { BannerSwiper } from "./components/slider/slider";



const initApp = async () => {
    // Создаем экземпляр корзины
    const cart = createCart();
    cart.init();

    // Загрузка данных
    const products = await fetchProducts();

    // Создаем менеджер состояния
    const productManager = createProductStateManager(products);


    // Функция для обновления отображения
    const updateProductsDisplay = (productsToDisplay) => {
        const container = document.querySelector(".cards-container");
        container.innerHTML = productsToDisplay.map(product =>
            createProductCard(product.title, product.price, product.image, product.id)
        ).join("");
    };

    // Инициализация фильтров
    const initFilters = () => {
        const checkboxes = document.querySelectorAll('.category-checkbox input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const filteredProducts = productManager.toggleFilter(
                    checkbox.dataset.checkboxCategory
                );
                updateProductsDisplay(filteredProducts);
            });
        });
    };

    // Инициализация сортировки
    const initSorting = () => {
        initSortDropdown(
            () => productManager.getCurrentProducts(),
            (sortCallback) => {
                updateProductsDisplay(sortCallback());
            }
        );
    };

    // Первоначальное отображение
    updateProductsDisplay(products);

    // Инициализация UI
    initFilters();
    initSorting();
    handlerMenu();
    BannerSwiper();
    handleToggleCart();
    handleToggleFilter();
    document.querySelectorAll('.card-product__button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetParent = e.currentTarget.closest('.card-product');
            const productId = Number(targetParent.dataset.cardId);
            const product = products.find(p => p.id === productId);
            console.log(productId)
            if (product) {
                cart.addItem(product);
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', initApp);