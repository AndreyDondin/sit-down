//селекторы
const regChoices = document.querySelector('.header__select-region');
const categoryChoices = document.querySelector('.header__select-category');
const choicesOne = new Choices(regChoices, {
  placeholder: true,
  searchEnabled: false,
  itemSelectText: '',
  allowHTML: true,
});

const choicesTwo = new Choices(categoryChoices, {
  placeholder: true,
  searchEnabled: false,
  itemSelectText: '',
  allowHTML: true,
});

/*Скролл*/
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

//бургер
let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__list');
let link = document.querySelectorAll('.header__link');
let menuContacts = document.querySelector('.header__contacts-nav');

burger.addEventListener('click', function () {
  burger.classList.toggle('header__burger--active');
  menu.classList.toggle('header__list--active');
  menuContacts.classList.toggle('header__list--active');
  document.body.classList.toggle('stop-scroll');
});

link.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('header__burger--active');
    menu.classList.remove('header__list--active');
    menuContacts.classList.remove('header__list--active');
    document.body.classList.remove('stop-scroll');
  });
});

//basket
const numberPurchase = document.querySelector('.header__user-purchases');
const local = localStorage.getItem('backet');
if (local === null) {
  numberPurchase.textContent = 0;
} else numberPurchase.textContent = local;
