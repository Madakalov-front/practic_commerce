import {sortProducts} from '../filterSort/filterSort.js'

export const initSortDropdown = (getCurrentProducts, updateProductsCallback) => {
    const dropdown = document.querySelector('.sort-dropdown');
    if (!dropdown) return null;
    
    const button = dropdown.querySelector('.sort-dropdown__toggle');
    const menu = dropdown.querySelector('.sort-dropdown__menu');
    const arrow = dropdown.querySelector('.sort-dropdown__arrow');
    const items = menu.querySelectorAll('li');

    const closeMenu = () => {
        dropdown.classList.remove('active');
        arrow.textContent = '▼';
    };

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            button.innerHTML = `${item.textContent} <span class="sort-dropdown__arrow">▼</span>`;
            closeMenu();
            
            // Получаем и обновляем продукты через callback
            updateProductsCallback(() => {
                return sortProducts(getCurrentProducts(), item.dataset.sort);
            });
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            closeMenu();
        }
    });
};