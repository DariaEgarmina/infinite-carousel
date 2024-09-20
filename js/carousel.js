import { debounce } from './util.js';

const CARDS_PER_PAGE = 5;

const prevButtonElement = document.querySelector('.slider__button--prev');
const nextButtonElement = document.querySelector('.slider__button--next');

const sliderList = document.querySelector('.slider__list');
const sliderItems = document.querySelectorAll('.slider__item');
const sliderItem = document.querySelector('.slider__item');

const itemWidth = sliderItem.offsetWidth;
const originalTransition = getComputedStyle(sliderList).transition;

const fragmentLastCards = document.createDocumentFragment();
const fragmentFirstCards = document.createDocumentFragment();

const createClones = () => {
  for (let i = sliderItems.length - 1, j = 0; i >= sliderItems.length - 5, j < 5; i--, j++) {
    const cloneLastCards = sliderItems[i].cloneNode(true);
    const cloneFirstCards = sliderItems[j].cloneNode(true);

    fragmentLastCards.append(cloneLastCards);
    fragmentFirstCards.append(cloneFirstCards);

    sliderList.prepend(fragmentLastCards);
    sliderList.append(fragmentFirstCards);
  }
};

sliderList.style.transition = 'none';
sliderList.style.transform = `translateX(${-CARDS_PER_PAGE * itemWidth}px)`;

let currentIndex = 0;

const moveSlider = (direction) => {
  sliderList.style.transition = originalTransition;

  if (direction === 'next') {
    currentIndex += 5;
  } else {
    currentIndex -= 5;
  }

  sliderList.style.transform = `translateX(${-(CARDS_PER_PAGE + currentIndex) * itemWidth}px)`;

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
    currentIndex = 15;
  }
};

createClones();

prevButtonElement.addEventListener('click', debounce(() => moveSlider('prev'), 200));
nextButtonElement.addEventListener('click', debounce(() => moveSlider('next'), 200));
