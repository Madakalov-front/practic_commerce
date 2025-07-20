export const createProductCard = (title, price, image, id) => {
    return `
    <a href="#!" class="card-product" data-card-id="${id}">
      <div class="card-product__gallery">
        <img src="/images/picture/card-product-hover.png" alt="${title}">
        <img src="/images/picture/card-product-${image}.png" alt="${title}">
      </div>
      <h2 class="card-product__title">${title}</h2>
      <footer class="card-product__footer">
        <p class="card-product__price">${price} ₽</p>
        <button class="card-product__button" type="button">
            <svg>
                <use href="#icon-plus"></use>
            </svg>
        </button>
      </footer>
    </a>
  `;
}