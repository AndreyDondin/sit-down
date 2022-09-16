//swiper main
const swiperNavigation = new Swiper('.card__swiper-navigation', {
  spaceBetween: 38,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
      direction: 'horizontal',
    },
    440: {
      spaceBetween: 18,
      slidesPerView: 4,
      direction: 'vertical',
    },
    850: {
      slidesPerView: 3,
      direction: 'horizontal',
    },
    1050: {
      slidesPerView: 4,
    },
  },
});
const swiperMain = new Swiper('.card__swiper-main', {
  spaceBetween: 10,
  thumbs: {
    swiper: swiperNavigation,
  },
});

//свайпер same
const swipSame = new Swiper('.same__swiper', {
  speed: 400,
  slidesPerView: 4,
  spaceBetween: 32,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
    1025: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },
});
const swiperSame = document.querySelector('.same__swiper').swiper;

const btnLeft = document.querySelector('.same__btn-left');
const btnRight = document.querySelector('.same__btn-right');
btnLeft.addEventListener('click', () => {
  swiperSame.slidePrev();
  btnRight.disabled = false;
  if (swiperSame.isBeginning) {
    btnLeft.disabled = true;
  }
});
btnRight.addEventListener('click', () => {
  btnLeft.disabled = false;
  swiperSame.slideNext();
  if (swiperSame.isEnd) {
    btnRight.disabled = true;
  }
});

//маска и валидация
const selector = document.querySelector("input[type='tel']");
const mask = new Inputmask('+7(999) 999-99-99');
mask.mask(selector);

const validation = new JustValidate('.card__modal-form', {
  errorFieldCssClass: 'is-invalid',
  errorLabelCssClass: 'is-label-invalid',
  errorLabelStyle: {
    color: '#FF6972',
    fontSize: '12px',
    paddingBottom: '4px',
    paddingLeft: '20px',
  },
});

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите имя',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Минимальная длина имени - 2',
    },
    {
      rule: 'customRegexp',
      value: /^[A-zА-яЁё]+$/,
      errorMessage: 'Недопустимые символы в имени',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Максимальная длина имени - 30',
    },
  ])
  .addField('#phone', [
    {
      rule: 'required',
      errorMessage: 'Введите  номер телефона',
    },
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      },
      errorMessage: 'Номер телефона некорректен',
    },
  ])
  .addField('#checkbox', [
    {
      rule: 'required',
      errorMessage: 'Согласие с пользовательским соглашением обязательно',
    },
  ]);

document.querySelectorAll('.btn').forEach((btn) => {
  if (btn.textContent === 'Купить') {
    btn.addEventListener('click', () => {
      document.location.href = 'card.html';
    });
  }
});

//btn add
const btnAddInBasket = document.querySelector('.card__button-add');
btnAddInBasket.addEventListener('click', () => {
  numberPurchase.textContent++;
  const number = numberPurchase.textContent;
  localStorage.setItem('backet', number);
});

//modal
const btnBuy = document.querySelector('.card__btn');
const btnClose = document.querySelector('.card__modal-purchase-btn');
const btnCloseCallback = document.querySelector('.card__modal-callback-btn');
const btnCloseImages = document.querySelector('.card__modal-images-btn');
const cardImg = document.querySelector('.card__img-wrap');
const cardImgMore = document.querySelector('.card__img-wrap-more');
const modalPurchase = document.querySelector('.card__modal-purchase');
const modalCallback = document.querySelector('.card__modal-callback');
const modalForm = document.querySelector('.card__modal-form');
const modalImages = document.querySelector('.card__modal-images');
const purchase = btnBuy.addEventListener('click', () => {
  modalPurchase.classList.add('card__modal--active');
  document.body.classList.add('stop-scroll');
});
btnClose.addEventListener('click', () => {
  modalPurchase.classList.remove('card__modal--active');
  document.body.classList.remove('stop-scroll');
});
btnCloseCallback.addEventListener('click', () => {
  modalCallback.classList.remove('card__modal--active');
  document.body.classList.remove('stop-scroll');
});
btnCloseImages.addEventListener('click', () => {
  modalImages.classList.remove('card__modal--active');
  document.body.classList.remove('stop-scroll');
});
modalForm.addEventListener('submit', (e) => {
  e.preventDefault;
  if (validation.onSuccess().isValid) {
    modalPurchase.classList.remove('card__modal--active');
    modalCallback.classList.add('card__modal--active');
    document.body.classList.add('stop-scroll');
  }
});
cardImg.addEventListener('click', () => {
  modalImages.classList.add('card__modal--active');
  document.body.classList.add('stop-scroll');
});

//свайпер в модалке

const swipModal = new Swiper('.card__modal-images-swiper', {
  speed: 400,
  slidesPerView: 4,
  spaceBetween: 78,
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1025: {
      slidesPerView: 4,
    },
  },
});

const swiperModalMain = new Swiper('.card__modal-swiper-main', {
  spaceBetween: 10,
  thumbs: {
    swiper: swipModal,
  },
});
const swiperModal = document.querySelector('.card__modal-images-swiper').swiper;

const btnModalLeft = document.querySelector(
  '.card__modal-images-btn-swiper-left'
);
const btnModalRight = document.querySelector(
  '.card__modal-images-btn-swiper-right'
);
btnModalLeft.addEventListener('click', () => {
  swiperModal.slidePrev();
  btnModalRight.disabled = false;
  if (swiperModal.isBeginning) {
    btnModalLeft.disabled = true;
  }
});
btnModalRight.addEventListener('click', () => {
  btnModalLeft.disabled = false;
  swiperModal.slideNext();
  if (swiperModal.isEnd) {
    btnModalRight.disabled = true;
  }
});
