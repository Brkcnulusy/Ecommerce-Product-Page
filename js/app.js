import { _addClass, _addProductToCart, _removeClass } from "./ui.js";

const ecommerce = (function () {
  // Variables

  const cart = document.querySelector(".js-cart");
  const cartDropdown = document.querySelector(".js-cart-dropdown");
  const openModalButton = document.querySelector(".js-banner-button");
  const bannerImages = document.querySelectorAll(".js-banner-galeri img");
  const bannerPictures = document.querySelectorAll(".js-banner-picture");
  const bannerOtherPictures = document.querySelectorAll(
    ".js-banner-other-picture"
  );
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
  const slideImages = document.querySelectorAll(".js-modal-galeri img");
  const bannerNextButton = document.querySelector(".js-banner-next");
  const bannerPrevButton = document.querySelector(".js-banner-prev");
  const hamburgerIcon = document.querySelector(".js-hamburger");
  const hamburgerMenu = document.querySelector(".js-menu");
  const closeMenuButton = document.querySelector(".js-close-menu");
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
      _closeDropdown(target);
    });
    modalOtherPictures.forEach((modalOtherPitcure) => {
      modalOtherPitcure.addEventListener("click", _changeModalImage);
    });
    modalPictures.forEach((picture) => {
      picture.addEventListener("click", (e) => {
        const target = e.target;
        _toggleClass(modalPictures, target);
      });
    });
    nextSlide.addEventListener("click", () => _nextImage(slideImages));
    prevSlide.addEventListener("click", () => _previousImage(slideImages));
    bannerNextButton.addEventListener("click", () => _nextImage(bannerImages));
    bannerPrevButton.addEventListener("click", () =>
      _previousImage(bannerImages)
    );
    hamburgerIcon.addEventListener("click", _openMenu);
    closeMenuButton.addEventListener("click", _closeMenu);
  };
  // FunC

  const _closeDropdown = function (target) {
    if (
      target.closest(".js-cart-dropdown") ||
      target.closest(".js-cart") ||
      target.closest(".js-delete-product")
    ) {
      _addClass(cartDropdown);
    } else {
      _removeClass(cartDropdown);
    }
  };

  const _openMenu = function () {
    _addClass(hamburgerMenu);
  };

  const _closeMenu = function () {
    _removeClass(hamburgerMenu);
  };

  const _deleteProduct = function (target) {
    if (target.closest(".js-delete-product")) {
      target.parentElement.remove();
      if (cartProducts.children.length == 0) {
        _addClass(emptyCartMessage);
        _removeClass(checkoutButton);
      }
    }
  };

  const _addToCart = function () {
    const productData = {
      quantity: Number(quantityScreen.innerHTML),
      price: 125.0 * Number(quantityScreen.innerHTML),
    };

    _addClass(checkoutButton);
    _removeClass(emptyCartMessage);

    if (cartProducts.children.length < 3) {
      _addProductToCart(cartProducts, productData);
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
      _removeClass(element);
      element.classList.remove("active");
    });
    target.parentElement.classList.add("active");
  };

  const _changeModalImage = function (e) {
    currentIndex = Number(e.target.alt);
    _showImage(currentIndex, slideImages);
  };

  const _changeBannerImage = function (e) {
    currentIndex = Number(e.target.alt);
    _showImage(currentIndex, bannerImages);
  };

  const _nextImage = function (element) {
    currentIndex = (currentIndex + 1) % element.length;
    _showImage(currentIndex, element);
    modalPictures.forEach((picture) => {
      _removeClass(picture);
    });
    modalPictures[currentIndex].classList.add("active");
  };
  const _previousImage = function (element) {
    currentIndex = (currentIndex - 1) % element.length;
    modalPictures.forEach((picture) => {
      _removeClass(picture);
    });
    if (currentIndex < 0) {
      currentIndex = element.length - 1;
      _showImage(currentIndex, element);
      modalPictures[currentIndex].classList.add("active");
    } else {
      _showImage(currentIndex, element);
      modalPictures[currentIndex].classList.add("active");
    }
  };
  const _showImage = function (Index, elements) {
    elements.forEach((element) => {
      element.style.display = "none";
    });
    elements[Index].style.display = "block";
  };

  const _closeModal = function () {
    _removeClass(modal);
  };

  const _openModal = function () {
    if (modal.classList.contains("active")) {
      _removeClass(modal);
    } else {
      _addClass(modal);
    }
  };

  const _openDropdown = function () {
    if (cartDropdown.classList.contains("active")) {
      _removeClass(cartDropdown);
    } else {
      _addClass(cartDropdown);
    }
  };

  return {
    init: function () {
      _eventListeners();
      _showImage(currentIndex, bannerImages);
      _showImage(currentIndex, slideImages);
    },
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  ecommerce.init();
});
