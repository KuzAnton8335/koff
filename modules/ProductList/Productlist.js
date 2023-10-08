import { addContainer } from "../addContainer";
import { API_URL } from "/const";

export class Productlist {
  static instance = null;

  constructor() {
    if (!Productlist.instance) {
      Productlist.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('goods');
      this.containerElement = addContainer(this.element, "goods__container");
      this.isMounted = false;
      this.addEvents();
    }
    return Productlist.instance
  }

  mount(parent, data, title) {
    this.containerElement.textContent = '';
    const titleElem = document.createElement('h2');
    titleElem.textContent = title ? title : 'Список товаров';
    titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';

    this.containerElement.append(titleElem);
    this.updateListElem(data);

    if (this.isMounted) {
      return;
    }
    parent.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
  addEvents() {

  }
  updateListElem(data = []) {
    const listElem = document.createElement('ul');
    listElem.classList.add('goods__list');
    const listItems = data.map((item) => {
      const listItemElem = document.createElement('li');
      listItemElem.innerHTML = this.getHTMLTemplateListItem(item);
      return listItemElem;
    });
    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }



  getHTMLTemplateListItem({ id, images: [image], name: title, price }) {
    return `<article class="goods__card card">
    <a href="/product/${id}" class="card__link card__link-img">
      <img src="${API_URL}${image}" alt="${title}" class="card__img">
    </a>
    <div class="card__info">
      <h3 class="card__title">
        <a href="/product/${id}" class="card__link">
          ${title}
        </a>
      </h3>
      <p class="card__price">${price.toLocaleString()}&nbsp;P</p>
    </div>
    <button class="card__btn" data-id="${id}">В корзину</button>
    <button class="card__favorit" data-id="${id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        viewBox="0 0 16 16" fill="none">
        <path
          d="M8.41334 13.8733C8.18668 13.9533 7.81334 13.9533 7.58668 13.8733C5.65334 13.2133 1.33334 10.46 1.33334 5.79332C1.33334 3.73332 2.99334 2.06665 5.04001 2.06665C6.25334 2.06665 7.32668 2.65332 8.00001 3.55998C8.67334 2.65332 9.75334 2.06665 10.96 2.06665C13.0067 2.06665 14.6667 3.73332 14.6667 5.79332C14.6667 10.46 10.3467 13.2133 8.41334 13.8733Z"
          fill="white" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </article>`
  }
}
