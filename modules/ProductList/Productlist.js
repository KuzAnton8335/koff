import { Card } from '../../features/Card/Card';
import { addContainer } from "../addContainer";

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

  mount(parent, data, title, emtyText) {
    this.containerElement.textContent = '';
    const titleElem = document.createElement('h2');
    titleElem.textContent = title ? title : 'Список товаров';
    titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';

    this.containerElement.append(titleElem);

    if (data && data.length) {
      this.updateListElem(data);
    } else {
      this.containerElement.insertAdjacentHTML('beforeend', `
       <p class="goods__empty">${emtyText || 'Произошла ошибка попробуйте снова'}</p>
      `);
    }

    parent.append(this.element);

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
    const listItems = data.map(({ id, images: [image], name: title, price }) => {
      const listItemElem = document.createElement('li');
      listItemElem.append(new Card({ id, image, title, price }).create());
      return listItemElem;
    });
    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }
}
