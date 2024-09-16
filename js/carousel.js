//const nextButtonElement = document.querySelector('.slider__button--next');
const prevButtonElement = document.querySelector('.slider__button--prev');

const sliderList = document.querySelector('.slider__list');
const sliderItems = document.querySelectorAll('.slider__item');
const sliderItem = document.querySelector('.slider__item');

const itemWidth = sliderItem.offsetWidth;

let currentIndex = 0;

const moveSliderPrev = () => {
  currentIndex -= 5;
  sliderList.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

  for (let i = sliderItems.length - 1; i >= sliderItems.length - 5; i--) {
    const clone = sliderItems[i].cloneNode(true);
    sliderItems[i].remove();
    sliderList.insertBefore(clone, sliderList.firstChild);
  }

  setTimeout(() => {
    sliderList.style.transform = '';
  }, 500);
};

// nextButtonElement.addEventListener('click', () => moveSlider('next'));
prevButtonElement.addEventListener('click', () => moveSliderPrev('prev'));
