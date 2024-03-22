export const _addClass = function (element) {
    element.classList.add('active');
}
export const _removeClass = function (element) {
    element.classList.remove('active');

}

export const _addProductToCart = function (element, data) {
    element.innerHTML += `
      <div class="product">
        <div class="product-image">
          <img src="./assets/images/image-product-1-thumbnail.jpg" alt="product">
        </div>
        <div class="product-info">
          <div class="product-name">
            <h3>Fall Limited Edition Sneakers</h3>
          </div>
          <div class="product-price">
            <p>$125.00 x ${data.quantity}</p>
            <span>$${Number(data.price)}</span>
          </div>
        </div>
        <img class="js-delete-product" src="./assets/images/icon-delete.svg" alt="delete">
      </div>
      `;
}