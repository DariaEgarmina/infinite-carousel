const nextButtonElement = document.querySelector('.slider__button--next');
const prevButtonElement = document.querySelector('.slider__button--prev');

const goodsContainer = document.querySelector('.goods__list');
const goods = goodsContainer.children;

const removeElement = (element) => {
  element.remove();
};

const moveLeft = (element) => {
  removeElement(element);
  goodsContainer.appendChild(element);
};

const moveRight = (element) => {
  const beforeElement = goods[0];
  removeElement(element);
  goodsContainer.insertBefore(element, beforeElement);
};

prevButtonElement.addEventListener('click', () => {
  moveLeft(goods[0]);
});

nextButtonElement.addEventListener('click', () => {
  moveRight(goods[goods.length - 1]);
});
