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


async function delayedLoop(cb) {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    cb();
  }
}

prevButtonElement.addEventListener('click', () => {
  delayedLoop(() => {
    moveLeft(goods[0]);
  });
});

nextButtonElement.addEventListener('click', () => {
  delayedLoop(() => {
    moveRight(goods[goods.length - 1]);
  });
});
