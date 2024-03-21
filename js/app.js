const ecommerce = (function () {
  // Variables

  const cart = document.querySelector(".js-cart");
  const cartDropdown = document.querySelector(".js-cart-dropdown");
  const openModalButton = document.querySelector(".js-banner-button");
  const bannerImage = document.querySelector(".js-banner-image");
  const bannerPictures = document.querySelectorAll(".js-banner-picture");
  const bannerOtherPictures = document.querySelectorAll(".js-banner-other-picture");
  const quantityMinus = document.querySelector(".js-minus");
  const quantityPlus = document.querySelector(".js-plus");
  const quantityScreen = document.querySelector(".js-quantity-screen");
  const addToCartButton = document.querySelector(".js-add-to-cart");
  const modal = document.querySelector(".js-modal");
  const closeModalButton = document.querySelector(".js-close-modal");
  const prevSlide = document.querySelector(".js-prev");
  const nextSlide = document.querySelector(".js-next");
  const modalOtherPictures = document.querySelectorAll(".js-modal-picture");
  const modalPictures = document.querySelectorAll(".js-picture");
  const checkoutButton = document.querySelector(".js-checkout-button");
  const cartProducts = document.querySelector(".js-cart-products");
  const emptyCartMessage = document.querySelector(".js-cart-empty");
  const slideImages = document.querySelectorAll('.js-modal-galeri img')
  let currentIndex = 0;

  // Event Listeners

  const _eventListeners = function () {
    cart.addEventListener("click", _openDropdown);
    openModalButton.addEventListener("click", _openModal);
    closeModalButton.addEventListener("click", _closeModal);
    bannerOtherPictures.forEach((picture) => {
      picture.addEventListener("click", _changeBannerImage);
    });
    bannerPictures.forEach((bannerPicture) => {
      bannerPicture.addEventListener("click", (e) => {
        const target = e.target;
        _toggleClass(bannerPictures, target);
      });
    });
    quantityMinus.addEventListener("click", _reduceQuantity);
    quantityPlus.addEventListener("click", _increaseQuantity);
    addToCartButton.addEventListener("click", _addToCart);
    document.addEventListener("click", function (e) {
      const target = e.target;
      _deleteProduct(target);
    });
    modalOtherPictures.forEach(modalOtherPitcure => {
      modalOtherPitcure.addEventListener('click', _changeModalImage);
    })
    modalPictures.forEach(picture => {
      picture.addEventListener('click', (e) => {
        const target = e.target;
        _toggleClass(modalPictures, target);
      })
    })
    nextSlide.addEventListener('click', _nextImage);
    prevSlide.addEventListener('click', _previousImage);
  };
  // FunC

  const _deleteProduct = function (target) {
    if (target.closest(".js-delete-product")) {
      target.parentElement.remove();
      if(cartProducts.children.length == 0) {
        emptyCartMessage.classList.add('active');
        checkoutButton.classList.remove('active');
      }
    }
  };

  const _addToCart = function () {
    const quantity = Number(quantityScreen.innerHTML);
    const price = 125.0 * quantity;

    checkoutButton.classList.add("active");
    emptyCartMessage.classList.remove("active");

    if (cartProducts.children.length < 4) {
      cartProducts.innerHTML += `
      <div class="product">
        <div class="product-image">
          <img src="./assets/images/image-product-1-thumbnail.jpg" alt="product">
        </div>
        <div class="product-info">
          <div class="product-name">
            <h3>Fall Limited Edition Sneakers</h3>
          </div>
          <div class="product-price">
            <p>$125.00 x ${quantity}</p>
            <span>$${price}</span>
          </div>
        </div>
        <img class="js-delete-product" src="./assets/images/icon-delete.svg" alt="delete">
      </div>
      `;
    }
  };

  const _reduceQuantity = function () {
    let screenValue = Number(quantityScreen.innerHTML);
    if (screenValue > 1) {
      screenValue--;
      quantityScreen.innerHTML = screenValue;
    } else {
      screenValue = 1;
      quantityScreen.innerHTML = screenValue;
    }
  };

  const _increaseQuantity = function () {
    let screenValue = Number(quantityScreen.innerHTML);
    if (screenValue < 10) {
      screenValue++;
      quantityScreen.innerHTML = screenValue;
    } else {
      screenValue = 10;
      quantityScreen.innerHTML = screenValue;
    }
  };

  const _toggleClass = function (elements, target) {
    elements.forEach((element) => {
      element.classList.remove("active");
    });
    target.parentElement.classList.add("active");
  };

  const _changeModalImage = function (e) {
    currentIndex = Number(e.target.alt);
    _showImage(currentIndex);
  }

  const _changeBannerImage = function (e) {
    const bannerImageSrc = e.target.src;
    const newBannerImgSrc = bannerImageSrc.replace("-thumbnail", "");
    bannerImage.src = newBannerImgSrc;
  };

  const _nextImage = function () {
    currentIndex = (currentIndex + 1) % slideImages.length;
    _showImage(currentIndex);
    modalPictures.forEach(picture => {
      picture.classList.remove('active');
    });
    modalPictures[currentIndex].classList.add('active');
  }
  const _previousImage = function () {
    currentIndex = (currentIndex - 1) % slideImages.length;
    modalPictures.forEach(picture => {
      picture.classList.remove('active');
    });
    if(currentIndex < 0) {
      currentIndex = slideImages.length -1;
      _showImage(currentIndex);
      modalPictures[currentIndex].classList.add('active');
  } else {
      _showImage(currentIndex);
      modalPictures[currentIndex].classList.add('active');
  }
  }
  const _showImage = function (Index) {
    slideImages.forEach(image => {
      image.style.display = 'none';
    });
    slideImages[Index].style.display = 'block';
  }

  const _closeModal = function () {
    modal.classList.remove("active");
  };

  const _openModal = function () {
    if (modal.classList.contains("active")) {
      modal.classList.remove("active");
    } else {
      modal.classList.add("active");
    }
  };

  const _openDropdown = function () {
    if (cartDropdown.classList.contains("active")) {
      cartDropdown.classList.remove("active");
    } else {
      cartDropdown.classList.add("active");
    }
  };

  return {
    init: function () {
      _eventListeners();
      _showImage(currentIndex);
    },
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  ecommerce.init();
});
