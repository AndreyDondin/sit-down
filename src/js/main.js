//свайпер hero
const swiper = new Swiper('.hero__swiper', {
  speed: 400,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: 'true',
  },
});

//свайпер offers
const swiperOffers = new Swiper('.offers__swiper', {
  speed: 400,
  spaceBetween: 32,
  slidesPerView: 'auto',
});

const swiperOffer = document.querySelector('.offers__swiper').swiper;

const btnOffersLeft = document.querySelector('.offers__btn-left');
const btnOffersRight = document.querySelector('.offers__btn-right');
btnOffersLeft.addEventListener('click', () => {
  swiperOffers.slidePrev();
  btnOffersRight.disabled = false;
  if (swiperOffer.isBeginning) {
    btnOffersLeft.disabled = true;
  }
});
btnOffersRight.addEventListener('click', () => {
  swiperOffers.slideNext();
  btnOffersLeft.disabled = false;
  if (swiperOffer.isEnd) {
    btnOffersRight.disabled = true;
  }
});

//свайпер useful
const swiperUseful = new Swiper('.useful__swiper', {
  speed: 400,
  spaceBetween: 32,
  autoHeight: true,
  observer: true,
  observeParents: true,

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
      slidesPerView: 2,
    },
  },
});
const swiperUF = document.querySelector('.useful__swiper').swiper;

const btnUsefulLeft = document.querySelector('.useful__btn-left');
const btnUsefulRight = document.querySelector('.useful__btn-right');
btnUsefulLeft.addEventListener('click', () => {
  swiperUF.slidePrev();
  btnUsefulRight.disabled = false;
  if (swiperUF.isBeginning) {
    btnUsefulLeft.disabled = true;
  }
});
btnUsefulRight.addEventListener('click', () => {
  btnUsefulLeft.disabled = false;
  swiperUF.slideNext();
  if (swiperUF.isEnd) {
    btnUsefulRight.disabled = true;
  }
});

//показать еще в "Высокий рейтинг"
const cards = document.querySelectorAll('.top-products__card');
const btnMore = document.querySelector('.top-products__btn-more');

let numberCards = 8;
let newNumberCards = 4;
let countCard = 16;

if (window.matchMedia('(max-width: 1024px)').matches) {
  numberCards = 6;
  newNumberCards = 3;
  countCard = 18;
}

if (window.matchMedia('(max-width: 768px)').matches) {
  newNumberCards = 4;
}

function loadCard() {
  for (let i = numberCards; i < cards.length; i++) {
    cards[i].classList.remove('top-products__card--visible');
  }
}
let timerId = null;
function removeByTimer() {
  if (timerId === null) {
    btnMore.classList.add('top-products__btn-more--hidden');
    timerId = null;
  } else timerId = null;
}
let count = numberCards;
function addCards() {
  if (count < countCard) {
    count += newNumberCards;
    if (count === countCard) {
      setTimeout(removeByTimer, 100);
    }
  } else {
    setTimeout(removeByTimer, 100);
  }
}

btnMore.addEventListener('click', () => {
  addCards();
  if (count <= cards.length) {
    for (let i = 0; i < count; i++) {
      cards[i].classList.add('top-products__card--visible');
      if (i >= numberCards) {
        cards[i].classList.add('top-products__card--animation');
      }
    }
  }
  btnMore.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
loadCard();

//маска и валидация
const selector = document.querySelector("input[type='tel']");
const mask = new Inputmask('+7(999) 999-99-99');
mask.mask(selector);

const validation = new JustValidate('.feedback__form', {
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
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Введите  email',
    },
    {
      rule: 'email',
      errorMessage: 'Email введен некорректно',
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
