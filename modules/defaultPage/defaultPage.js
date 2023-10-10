import { addContainer } from "../addContainer";

export class defaultPage {
  static instance = null;

  constructor() {
    if (!defaultPage.instance) {
      defaultPage.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('default');
      this.containerElement = addContainer(this.element, 'default__container');

    }
    return defaultPage.instance
  }

  mount(parent) {
    if (this.isMounted) {
      return;
    }

    const renderdefaultElem = this.getrenderdefaultElem();
    this.containerElement.append(renderdefaultElem);
    parent.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  getrenderdefaultElem() {
    const listdefaultElem = document.createElement('div');
    listdefaultElem.classList.add('default__content');
    const defaultTitle = this.getdefaultTitle();
    const defaultText = this.getdefaultText();
    listdefaultElem.append(defaultTitle, defaultText);
    return listdefaultElem;
  }

  getdefaultTitle() {
    const defaultTitle = document.createElement('h2');
    defaultTitle.classList.add('default__title');
    defaultTitle.textContent = "Страница не найдена";
    return defaultTitle;
  }

  getdefaultText() {
    const defaultText = document.createElement('p');
    defaultText.classList.add('default__text');
    defaultText.innerText = 'Через 5 секунд вы будуте перенаправлены';
    const defaultLink = this.getdefaultLink();
    defaultText.append(defaultLink);
    return defaultText;
  }

  getdefaultLink() {
    const defaultLink = document.createElement('a');
    defaultLink.classList.add('default__link');
    defaultLink.href = '/';
    defaultLink.innerText = 'на главную страницу';
    return defaultLink;
  }
}


