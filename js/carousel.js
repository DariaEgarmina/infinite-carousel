import { debounce } from './util.js';

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

const moveSlider = (direction) => {
  sliderList.style.transition = originalTransition;
  if (direction === 'next') {
    currentIndex += 5;
  } else {
    currentIndex -= 5;
  }

  sliderList.style.transform = `translateX(${-(5 + currentIndex) * itemWidth}px)`;

  if (currentIndex === 20) {
    setTimeout(() => {
      sliderList.style.transform = `translateX(${-5 * itemWidth}px)`;
    }, 100);
    currentIndex = 0;
  }

  if (currentIndex === -5) {
    setTimeout(() => {
      sliderList.style.transform = `translateX(${-20 * itemWidth}px)`;
    }, 100);
    currentIndex = 15;
  }
};

prevButtonElement.addEventListener('click', debounce(() => moveSlider('prev'), 200));
nextButtonElement.addEventListener('click', debounce(() => moveSlider('next'), 200));
