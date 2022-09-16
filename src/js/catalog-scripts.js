//селекторы
const catalogCategoryChoices = document.querySelector(
  '.catalog__select-category'
);
const catalogPriceChoices = document.querySelector('.catalog__select-price');
const catalogSaleChoices = document.querySelector('.catalog__select-sale');
const catalogColorChoices = document.querySelector('.catalog__select-color');

const choicesThree = new Choices(catalogCategoryChoices, {
  placeholder: true,
  searchEnabled: false,
  itemSelectText: '',
  allowHTML: true,
});

const choicesFour = new Choices(catalogPriceChoices, {
  placeholder: true,
  searchEnabled: false,
  itemSelectText: '',
  allowHTML: true,
});

const choicesFive = new Choices(catalogSaleChoices, {
  placeholder: true,
  searchEnabled: false,
  itemSelectText: '',
  allowHTML: true,
});

const choicesSix = new Choices(catalogColorChoices, {
  placeholder: true,
  searchEnabled: false,
  itemSelectText: '',
  allowHTML: true,
});

//ползунок
const slider = document.getElementById('slider');

noUiSlider.create(slider, {
  start: [20000, 100000],
  connect: true,
  step: 1,

  range: {
    min: 2000,
    max: 150000,
  },
  format: {
    from: function (value) {
      return parseInt(value);
    },
    to: function (value) {
      return parseInt(value);
    },
  },
});

const priceMin = document.querySelector('.catalog__input-min');
const priceMax = document.querySelector('.catalog__input-max');

const inputs = [priceMin, priceMax];

slider.noUiSlider.on('update', (values, handle) => {
  inputs[handle].value = values[handle];
});

inputs.forEach(function (input, handle) {
  input.addEventListener('change', function () {
    slider.noUiSlider.setHandle(handle, this.value);
  });
});

//табы
document.querySelectorAll('.catalog__pagination-btn').forEach((tabsBtn) => {
  tabsBtn.addEventListener('click', (btn) => {
    const path = btn.currentTarget.dataset.path;

    document.querySelectorAll('.catalog__pagination-btn').forEach((button) => {
      button.classList.remove('catalog__pagination-btn--active');
    });
    btn.currentTarget.classList.add('catalog__pagination-btn--active');

    document.querySelectorAll('.catalog__cards-tab').forEach((tab) => {
      tab.classList.remove('catalog__cards-tab--active');
    });
    document
      .querySelector(`[data-target="${path}"]`)
      .classList.add('catalog__cards-tab--active');
  });
});

if (window.matchMedia('(max-width: 850px)').matches) {
  const tab1 = document.querySelector('.catalog__cards-tab-one');
  const tab2 = document.querySelector('.catalog__cards-tab-two');
  const tab3 = document.querySelector('.catalog__cards-tab-three');

  const cards = document.querySelectorAll('.catalog__card');

  for (let i = 0; i < 18; i++) {
    if (i < 6) {
      tab1.append(cards[i]);
    }
    if (i > 5 && i < 12) {
      tab2.append(cards[i]);
    }
    if (i > 11) {
      tab3.append(cards[i]);
    }
  }
}

document.querySelectorAll('.btn').forEach((btn) => {
  if (btn.textContent === 'Купить') {
    btn.addEventListener('click', () => {
      document.location.href = 'card.html';
    });
  }
});
