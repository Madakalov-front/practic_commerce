// cart.js
export const createCart = () => {
    let items = [];

    // Добавление товара в корзину
    const addItem = (product) => {
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            items.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();
    };

    // Удаление товара из корзины
    const removeItem = (productId) => {
        items = items.filter(item => item.id !== productId);
        updateCart();
    };

    // Изменение количества товара
    const updateQuantity = (productId, newQuantity) => {
        const item = items.find(item => item.id === productId);

        if (item) {
            if (newQuantity > 0) {
                item.quantity = newQuantity;
            } else {
                removeItem(productId);
                return;
            }
        }

        updateCart();
    };

    // Очистка корзины
    const clearCart = () => {
        items = [];
        updateCart();
    };

    // Подсчет общей суммы
    const getTotal = () => {
        return items.reduce((sum, item) => {
            if (item.inStock) {
                return sum + (item.price * item.quantity)
            } else {
                return sum
            }
        }, 0);
    };

    // Подсчет количества товаров
    const getCount = () => {
        const cartHeader = document.querySelector('.cart');
        const btnOpen = document.querySelector('#open-cart');
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        if (count) {
            cartHeader.classList.add('cart--has-product')
        } else {
            cartHeader.classList.remove('cart--has-product')
        }
        btnOpen.dataset.countProduct = count;
        return count
    };

    // Обновление UI корзины
    const updateCart = () => {
        // Здесь будем обновлять интерфейс
        console.log('Корзина обновлена:', items);
        renderCartModal();
    };

    // Рендер модального окна корзины
    const renderCartModal = () => {
        const modal = document.querySelector('.cart-modal');
        if (!modal) return;

        // Обновляем количество товаров
        modal.querySelector('.cart-modal__count').textContent =
            `${getCount()} ${getNoun(getCount(), 'товар', 'товара', 'товаров')}`;

        // Обновляем общую сумму
        modal.querySelector('.cart-modal__total p').textContent =
            `${getTotal().toLocaleString()} ₽`;

        // Рендерим список товаров
        const deleteBtn = (id) => ` <button class="card-product-cart__delete" data-id="${id}">
              <svg><use href="#icon-close"></use></svg>
            </button>`
        const reloadBtn = (id) => ` <button class="card-product-cart__reload" data-id="${id}">
              <svg><use href="#icon-reload"></use></svg>
            </button>`
        const list = modal.querySelector('.cart-modal__list');
        list.innerHTML = items.map(item => `
      <li>
        <div class="card-product-cart ${!item.inStock ? 'card-product-cart--instock' : ''}" data-card-id="${item.id}">
          <div class="card-product-cart__picture">
            <img src="/images/picture/card-product-${item.image}.png" alt="${item.title}">
          </div>
          <div class="card-product-cart__info">
            <h5>${item.title}</h5>
            <span>${item.price.toLocaleString()} ₽</span>
          </div>
          <div class="card-product-cart__counter">
            <button class="card-product-cart__counter-minus" data-id="${item.id}"><svg><use href="#icon-minus"></use></svg></button>
            <span>${item.quantity}</span>
            <button class="card-product-cart__counter-plus" data-id="${item.id}"><svg><use href="#icon-plus"></use></svg></button>
          </div>
          <div class="card-product-cart__action">
           ${item.inStock ? deleteBtn(item.id) : reloadBtn(item.id)}
          </div>
        </div>
      </li>
    `).join('');

        // Добавляем обработчики событий
        addCartEventListeners();
    };

    // Функция для правильного склонения
    const getNoun = (number, one, two, five) => {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) return five;
        n %= 10;
        if (n === 1) return one;
        if (n >= 2 && n <= 4) return two;
        return five;
    };

    // Обработчики событий для корзины
    const addCartEventListeners = () => {
        console.log('init add')
        document.querySelectorAll('.card-product-cart__counter-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetParent = e.currentTarget.closest('.card-product-cart');
                const productId = Number(targetParent.dataset.cardId);
                const item = items.find(item => item.id === productId);
                if (item) updateQuantity(productId, item.quantity - 1);
            });
        });

        document.querySelectorAll('.card-product-cart__counter-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetParent = e.currentTarget.closest('.card-product-cart');
                const productId = Number(targetParent.dataset.cardId);
                const item = items.find(item => item.id === productId);
                if (item) updateQuantity(productId, item.quantity + 1);
            });
        });

        document.querySelectorAll('.card-product-cart__delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetParent = e.currentTarget.closest('.card-product-cart');
                const productId = Number(targetParent.dataset.cardId);
                removeItem(productId);
            });
        });

        document.querySelector('.cart-modal__clear')?.addEventListener('click', clearCart);
    };

    // Инициализация корзины
    const init = () => {
        // Открытие/закрытие модального окна
        document.querySelector('.cart-toggle')?.addEventListener('click', () => {
            document.querySelector('.cart-modal').classList.add('active');
        });

        document.querySelector('.cart-modal__close')?.addEventListener('click', () => {
            document.querySelector('.cart-modal').classList.remove('active');
        });

        // Первоначальный рендер
        renderCartModal();
    };

    return {
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItems: () => [...items],
        getTotal,
        getCount,
        init
    };
};

export const handleToggleCart = () => {
    const btnOpen = document.querySelector('#open-cart');
    const btnClose = document.querySelector('.cart-modal__close');
    const cart = document.querySelector('.cart-modal');
    if (!btnOpen || !btnOpen || !cart) {
        return null;
    }

    const toggleShow = () => {
        cart.classList.toggle('cart-modal--show');
    }
    btnOpen.addEventListener('click', toggleShow)
    btnClose.addEventListener('click', toggleShow)
}