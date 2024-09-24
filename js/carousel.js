import { debounce } from './util.js';

const CARDS_PER_PAGE = 5;

const prevButtonElement = document.querySelector('.slider__button--prev');
const nextButtonElement = document.querySelector('.slider__button--next');

const sliderList = document.querySelector('.slider__list');
const sliderItems = document.querySelectorAll('.slider__item');
const sliderItem = document.querySelector('.slider__item');

const itemWidth = sliderItem.offsetWidth;
const originalTransition = getComputedStyle(sliderList).transition;

const createClones = () => {
  const fragmentLastCards = document.createDocumentFragment();
  const fragmentFirstCards = document.createDocumentFragment();

  for (let i = 0; i < CARDS_PER_PAGE; i++) {
    const cloneLastCards = sliderItems[sliderItems.length - CARDS_PER_PAGE + i].cloneNode(true);
    const cloneFirstCards = sliderItems[i].cloneNode(true);

    fragmentLastCards.append(cloneLastCards);
    fragmentFirstCards.append(cloneFirstCards);
  }

  sliderList.prepend(fragmentLastCards);
  sliderList.append(fragmentFirstCards);
};

sliderList.style.transition = 'none';
sliderList.style.transform = `translateX(${-CARDS_PER_PAGE * itemWidth}px)`;

let currentIndex = 0;

const moveSlider = (direction) => {
  sliderList.style.transition = originalTransition;

  if (direction === 'next') {
    currentIndex += CARDS_PER_PAGE;
  } else {
    currentIndex -= CARDS_PER_PAGE;
  }

  const remainder = sliderItems.length % CARDS_PER_PAGE;

  sliderList.style.transform = `translateX(${-(CARDS_PER_PAGE + currentIndex) * itemWidth}px)`;

  if (remainder > 0) {
    if (currentIndex === sliderItems.length - remainder) {
      sliderList.style.transform = `translateX(${-(currentIndex + remainder) * itemWidth}px)`;
    } else if (currentIndex === sliderItems.length + CARDS_PER_PAGE - remainder) {
      sliderList.style.transform = `translateX(${-(currentIndex + remainder) * itemWidth}px)`;

      setTimeout(() => {
        sliderList.style.transition = 'none';
        sliderList.style.transform = `translateX(${-CARDS_PER_PAGE * itemWidth}px)`;
      }, 600);
      currentIndex = 0;
    }

    if (currentIndex === -(CARDS_PER_PAGE - remainder)) {
      sliderList.style.transform = `translateX(${-CARDS_PER_PAGE * itemWidth}px)`;
      currentIndex = 0;
    }
  }

  if (currentIndex === sliderItems.length) {
    setTimeout(() => {
      sliderList.style.transition = 'none';
      sliderList.style.transform = `translateX(${-CARDS_PER_PAGE * itemWidth}px)`;
    }, 600);
    currentIndex = 0;
  }

  if (currentIndex === -CARDS_PER_PAGE) {
    setTimeout(() => {
      sliderList.style.transition = 'none';
      sliderList.style.transform = `translateX(${-sliderItems.length * itemWidth}px)`;
    }, 600);
    currentIndex = sliderItems.length - CARDS_PER_PAGE;
  }
};

createClones();

prevButtonElement.addEventListener('click', debounce(() => moveSlider('prev'), 200));
nextButtonElement.addEventListener('click', debounce(() => moveSlider('next'), 200));
