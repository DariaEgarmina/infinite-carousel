const ALL_CARDS_AMOUNT = 20;
const SHOWN_CARDS_AMOUNT = 5;

const prevButtonElement = document.querySelector('.slider__button--prev');
const nextButtonElement = document.querySelector('.slider__button--next');

const sliderList = document.querySelector('.slider__list');
const sliderItems = document.querySelectorAll('.slider__item');
const sliderItem = document.querySelector('.slider__item');

const itemWidth = sliderItem.offsetWidth;
const originalTransition = getComputedStyle(sliderList).transition;

for (let i = sliderItems.length - 1; i >= sliderItems.length - 5; i--) {
  const clone = sliderItems[i].cloneNode(true);
  sliderList.insertBefore(clone, sliderList.firstChild);
}

for (let i = 0; i < 5; i++) {
  const clone = sliderItems[i].cloneNode(true);
  sliderList.append(clone);
}

sliderList.style.transition = 'none';
sliderList.style.transform = `translateX(${-5 * itemWidth}px)`;

let currentIndex = 0;

const moveSliderPrev = () => {
  if (currentIndex === 0) {
    sliderList.style.transition = originalTransition;
    sliderList.style.transform = '';

    setTimeout(() => {
      sliderList.style.transform = `translateX(${-ALL_CARDS_AMOUNT * itemWidth}px)`;
    }, 100);

    currentIndex = + 1;
  } else if (currentIndex === 1) {
    sliderList.style.transform = `translateX(${-(ALL_CARDS_AMOUNT - SHOWN_CARDS_AMOUNT) * itemWidth}px)`;

    currentIndex = + 2;
  } else if (currentIndex === 2) {
    sliderList.style.transform = `translateX(${-(ALL_CARDS_AMOUNT - SHOWN_CARDS_AMOUNT * 2) * itemWidth}px)`;

    currentIndex = + 3;
  } else if (currentIndex === 3) {
    sliderList.style.transform = `translateX(${-(ALL_CARDS_AMOUNT - SHOWN_CARDS_AMOUNT * 3) * itemWidth}px)`;

    currentIndex = 0;
  }
};

const moveSliderNext = () => {
  sliderList.style.transition = originalTransition;
  if (currentIndex === 0) {
    sliderList.style.transform = `translateX(${-10 * itemWidth}px)`;
    currentIndex = + 1;
  } else if (currentIndex === 1) {
    sliderList.style.transform = `translateX(${-15 * itemWidth}px)`;
    currentIndex = + 2;
  } else if (currentIndex === 2) {
    sliderList.style.transform = `translateX(${-20 * itemWidth}px)`;
    currentIndex = + 3;
  } else if (currentIndex === 3) {
    sliderList.style.transform = `translateX(${-25 * itemWidth}px)`;

    setTimeout(() => {
      sliderList.style.transform = `translateX(${-5 * itemWidth}px)`;
    }, 100);

    currentIndex = 0;
  }
};

prevButtonElement.addEventListener('click', () => moveSliderPrev());
nextButtonElement.addEventListener('click', () => moveSliderNext());
