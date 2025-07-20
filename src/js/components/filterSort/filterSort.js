const isValidArray = (products) => {
    return Array.isArray(products) && products.length;
}
// Фильтрация
export const filterProducts = (products, criteria) => {
    if (!isValidArray(products)) return products;

    const filters = {
        new: (p) => p.isNew,
        inStock: (p) => p.inStock,
        contract: (p) => p.isContract,
        exclusive: (p) => p.isExclusive,
        sale: (p) => p.isSale,
        all: () => true
    };

    return filters[criteria] ? products.filter(filters[criteria]) : products;
};

// Сортировка
export const sortProducts = (products, method) => {
    if (!isValidArray(products)) return products; // возвращаем оригинал если массив невалиден

    const sorters = {
        expensive: (a, b) => b.price - a.price,
        cheap: (a, b) => a.price - b.price,
        popular: (a, b) => b.popularity - a.popularity,
        new: (a, b) => new Date(b.date) - new Date(a.date)
    };

    return sorters[method] ? [...products].sort(sorters[method]) : products;
};

export const handleToggleFilter = () => {
    const btnOpen = document.querySelector('#open-filter');
    const btnClose = document.querySelector('#close-filter');
    const aside = document.querySelector('.catalog__aside');
    if (!btnOpen || !btnOpen || !aside) {
        return null;
    }
    const toggleShow = () => {
        aside.classList.toggle('catalog__aside--show');
    }
    btnOpen.addEventListener('click', toggleShow)
    btnClose.addEventListener('click', toggleShow)
}